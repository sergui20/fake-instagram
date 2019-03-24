import React from 'react';

function FeedPostsBox (props) {
    return (
        <div className="col m8 s12 l8">
            {props.children}
        </div>
    )
}

export default FeedPostsBox;