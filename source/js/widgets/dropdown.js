import React from 'react';

function Dropdown(props) {
    return (
        <div className="container dropdown-container">
            <ul className="dropdown-content">
                <li><a href="#">Profile</a></li>
                <li><a onClick={props.logout}>Logout</a></li>
            </ul>
        </div>
    )
}

export default Dropdown;