import React from 'react';

function HomepageLayout (props) {
    return (
        <div className="container">
            <div className="row">
                {props.children}
            </div>
        </div>
    )
}

export default HomepageLayout;