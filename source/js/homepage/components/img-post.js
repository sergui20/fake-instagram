import React from 'react';

import './img-posts.css'

function ImgPost (props) {
    return (
        <div className="img-post-div">
            <img src={props.src} className="img-post"></img>
        </div>
    )
}

export default ImgPost;