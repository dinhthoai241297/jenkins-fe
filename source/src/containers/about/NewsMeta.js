import React from 'react'
import { List } from 'antd';

import { AppConstants } from '../../constants';
import logo from "../../assets/images/logo.png";

export default function NewsMeta(props) {
    const { item, handleChangeNews, isShowList } = props;
    return (
       <List.Item
       className="list-item"
       key={item.id}
       >
           <div className="item-content">
            <img
                className="new-avatar"
                src={item.newAvatar ? `${AppConstants.contentRootUrl}${item.newAvatar}` : logo}
                style={{display: item.newAvatar ? "inline-block" : "none"}}
            />
            {
               isShowList ? <h1 className="item-meta" style={{cursor: "pointer"}} onClick={()=>handleChangeNews(item.id) }>{item.newTitle}</h1>
                : <h1 className="item-meta">{item.newTitle}</h1>
            }
               <p className="new-content">{item.newDescription}</p>
           </div>
           
        </List.Item>
    )
}
