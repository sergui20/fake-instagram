import React from 'react';

function Dropdown() {
    return (
        <div className="container dropdown-container">
            <ul className="dropdown-content">
                <li><a href="#">Profile</a></li>
                <li><a href="/logout">Logout</a></li>
            </ul>
        </div>
    )
}

export default Dropdown;