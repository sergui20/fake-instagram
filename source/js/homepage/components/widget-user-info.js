import React from 'react';

import './widget-user-info.css';

function WidgetUserInfo (props) {
    return (
        <div className="row">
            <div className="col s12 user-info-container">
                <div className="profilePic-container">
                    <img src={props.userInfo.img} className="widget-profilePic"></img>
                </div>
                <div className="user-names">
                    <span className="widget-nickname">{props.userInfo.username}</span>
                    <span className="widget-user-name">{`${props.userInfo.name}`}</span>
                </div>
            </div>
        </div>
    )
}

export default WidgetUserInfo;