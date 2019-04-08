import React from 'react';

function PostDropdown (props) {
    return (
        <ul id='dropOptions' className='dropdown-content dropdown-content-post'>
            <li><a onClick={props.deletePost} className="delete-post">Delete</a></li>
        </ul>
    )
}

export default PostDropdown;