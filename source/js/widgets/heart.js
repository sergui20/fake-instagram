import React from 'react';

import './heart.css';

function Heart (props) {
    return (
        <div className={props.heart ? "div-post-heart-active" : "div-post-heart"}>
            <i className="fas fa-heart post-heart"></i>
        </div>
    )
}

export default Heart