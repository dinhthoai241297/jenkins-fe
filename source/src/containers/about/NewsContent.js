import React from 'react';
import { List } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";
import NewsMeta from './NewsMeta';

export default function NewsContent(props) {
    const { detailNews, loading } = props;
    return (
        <div className="detail-news">
            <List loading={loading} style={{padding: 0}}>
                <NewsMeta item={detailNews}/>
            <div className="new-content" dangerouslySetInnerHTML={{ __html: detailNews?.newContent}} ></div>
            </List>
        </div>
    )
}
