import React from 'react';

import './heart.css';

function Heart (props) {
    return (
        <div className={props.classHeart}>
            <i className="fas fa-heart post-heart"></i>
        </div>
    )
}

export default Heart