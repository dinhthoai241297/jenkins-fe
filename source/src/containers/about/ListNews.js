import React from 'react'
import { List, Button } from 'antd';

import { AppConstants } from '../../constants';
import logo from "../../assets/images/logo.png";
import NewsMeta from './NewsMeta';

export default function ListNews(props) {
    const { listNews, handleChangeNews, loading, onLoadMore, numLoadMore } = props;

    const loadMore =
      numLoadMore > 0 && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>{`Xem thêm (${numLoadMore} bài)`}</Button>
        </div>
      ) : null;

    return (
        <List
        loadMore={loadMore}
        loading={loading}
        itemLayout="vertical"
        size="large"
        dataSource={listNews.data || []}
        className="list-news"
        renderItem={item => (
            <NewsMeta isShowList={true} item={item} handleChangeNews={handleChangeNews}/>
            )}
        />
    )
}
