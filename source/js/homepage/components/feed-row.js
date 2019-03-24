import React from 'react';

function FeedRow (props) {
    return (
        <div className="row">
            <div className="col m12 s12 l12">
                {props.children}
            </div>
        </div>
    )
}

export default FeedRow;