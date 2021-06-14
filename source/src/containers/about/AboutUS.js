import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, BackTop, Butto, List } from 'antd';
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import qs from "query-string";

import { actions } from '../../actions';

import {
    showErrorMessage,
} from '../../services/notifyService';

import { 
    categoriesComboboxSelector, 
    listNewsStackSelector,
} from '../../selectors/aboutUs';

import ListNews from './ListNews';
import NewsMeta from './NewsMeta';
import NewsContent from './NewsContent';
import sitePathConfig from '../../constants/sitePathConfig';

const { Header, Sider, Content, Footer } = Layout;

const DEFAULT_TABLE_ITEM_SIZE = 2;

const strParams = (params) =>{
    return qs.stringify(params);
}

const AboutUS = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const pathname = history.location.pathname;
    const { id, categoryId } = qs.parse(history.location.search);
    const key = history.location.key;
    let action = history.action;

    const categoriesCombobox = useSelector(categoriesComboboxSelector);
    const listNewsStack = useSelector(listNewsStackSelector);

    const [pageData, setPageData] = useState(undefined);
    const [listLoading, setListLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    if(listNewsStack?.length > 0){
        listNewsStack.forEach((e,i)=>{
            console.log(i, e.key);
        })
    }
    if(key)console.log("currentkey", key);
    console.log("numerloadmore", pageData?.numLoadMore);

    useEffect(()=>{
        dispatch(
            actions.getCategoryCombobox({
                onCompleted: data => {
                    if(data?.length > 0){
                        setIsInitialized(true);
                        history.push(`${pathname}?${strParams({ categoryId: categoryId || data[0]?.categoryId, id })}`);
                    }
                },
                onError: error => {
                    showErrorMessage(
                        error?.message || 'Đã xảy ra lỗi trong quá trình lấy dữ liệu!'
                    )
                },
            })
        );
    }, []);

    useEffect(()=>{

        if(key === undefined) return;
        const page = findPageInStack(key);
        if(page){
            setPageData(page);
        }
        else if(categoryId && isInitialized) {
            getData({
                id,
                categoryId,
            });
        }

    }, [key])

    const getData = (params) => {

        const { id, categoryId } = params;
        const index = findIndexInStack(key);

        if(id)getNewsById(id, index);
        else {
            getListNews(categoryId, index, DEFAULT_TABLE_ITEM_SIZE);
        }
    }

    const findPageInStack = (key) => {
        return listNewsStack && listNewsStack.find(p => p.key === key);
    }

    const findIndexInStack = (key) => {
        if(!listNewsStack) return -1;
        const index = listNewsStack.findIndex(p => p.key === key);
        if(index > -1)return index;
        if(action === "POP") return -1;
        return listNewsStack.findIndex(p => p.key === pageData?.key);
    }

    const getListNews = (categoryId, index, size) => {

        setListLoading(true);
        dispatch(
            actions.getListNews({
                params: {
                    categoryId,
                    size,
                    stack: index > -1 ? listNewsStack.slice(0, index + 1) : index === -2 ? [] : listNewsStack,
                    key,
                    action,
                },
                onCompleted: (responseData) => {

                    setListLoading(false);
                    setPageData({...responseData });

                },
                onError: error => {
                    setListLoading(false);
                    showErrorMessage(
                        error?.message || 'Đã xảy ra lỗi trong quá trình lấy dữ liệu!'
                    )
                },
            })
        );

    }

    const getNewsById = (id, index) => {

        setListLoading(true);
        dispatch(
            actions.getById({ 
                params: {
                    id,
                    stack: index > -1 ? listNewsStack.slice(0, index + 1) : listNewsStack,
                    key,
                    action,
                },
                onCompleted: (responseData) => {
                    setListLoading(false);
                    setPageData({...responseData.data, key});
                },
                onError: error => {
                    setListLoading(false);
                    showErrorMessage(
                        error?.message || 'Đã xảy ra lỗi trong quá trình lấy dữ liệu!'
                    )
                },
            })
        );

    }

    const handleChangeCategory = (value) => {
        if(window.innerWidth < 768){
            handleCollapsed();
        }
        history.push(`${pathname}?${strParams({ categoryId: value })}`);

    }

    const handleChangeNews = (value) => {

        history.push(`${pathname}?${strParams({ id: value, categoryId })}`);

    }

    const handleLoadMore = () => {

        const index = findIndexInStack(key);
        action = "PUSH";
        getListNews(
            categoryId,
            index > 0 ? index - 1 : index === 0 ? index - 2 : index,
            pageData?.size && pageData?.numLoadMore ? pageData.size + pageData.numLoadMore : DEFAULT_TABLE_ITEM_SIZE,
        );

    }

    const handleCollapsed = () => {

        if(window.innerWidth < 768){
            document.body.style.overflow = collapsed ? "hidden" : "auto";
        }
        setCollapsed(!collapsed);
        window.onresize = () =>{
            if(window.innerWidth >= 768){
                document.body.style.overflow = "auto";
            }
        }

    }

    return (
        <Layout className="aboutUs-page" >
            <BackTop />
            <div className={`layer ${collapsed ? "layer-hide" : ""}`}></div>
            <Sider
            collapsed={collapsed}
            onCollapse={handleCollapsed}
            breakpoint="md"
            collapsedWidth="0"
            className="sider"
            >

                <div className="menu-title">
                    <div style={{marginLeft: "8px", marginRight: "40px"}}>Danh mục tin tức</div>
                </div>

                <CloseOutlined 
                onClick={handleCollapsed} 
                className="close"
                />
                <Menu
                className="menu"
                selectedKeys={[`${categoryId}`]}
                mode="inline"
                theme="dark"
                disabled={listLoading}
                >
                {
                    categoriesCombobox && categoriesCombobox.map(c=>{
                        return (
                            <Menu.Item 
                            className="menu-item"
                            key={c.categoryId}
                            onClick={()=>{handleChangeCategory(c.categoryId)}}
                            >
                                { c.categoryName }
                            </Menu.Item>
                        )
                    })
                }
                </Menu>
            </Sider>
            <Content>
                { !id && pageData ? (
                    <ListNews
                    loading={listLoading}
                    numLoadMore={pageData.numLoadMore}
                    listNews={pageData} 
                    onLoadMore={handleLoadMore}
                    handleChangeNews={handleChangeNews}
                    />
                    ) : pageData ? (
                    <NewsContent detailNews={pageData}  loading={listLoading}/>
                ) : <List loading={listLoading} className="detail-news"></List>}
            </Content>
        </Layout>
    )
}

export default AboutUS
