import React from 'react';

import { Link } from 'react-router-dom';

import './has-account.css';

function HasAccount (props) {
    return (
        <p className="has-account-p">
            Have an account ?
            <Link exact="true" to={{
                pathname: '/'
            }} onClick={props.toggleSignupBox}> Login</Link>
        </p>
    )
}

export default HasAccount;