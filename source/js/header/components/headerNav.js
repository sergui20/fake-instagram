import React from 'react';

import './headerNav.css';

function HeaderNav(props) {
    return (
        <nav className="header">
            <div className="container">
                <div className="row header-row">
                    {props.children}
                </div>
            </div>
        </nav>
    )
}

export default HeaderNav;