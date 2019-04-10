import React from 'react';

import Heart from '../../widgets/heart'

import './img-posts.css'

function ImgPost (props) {
    return (
        <div className="img-post-div" onDoubleClick={props.toggleLiked}>
            <img src={props.src} className="img-post"></img>
            <Heart heart={props.heart}></Heart>
        </div>
    )
}

export default ImgPost;