import React from 'react';

import { Link } from 'react-router-dom';

import './has-account.css';

function HasAccount (props) {
    return (
        <p className="has-account-p">
            ¿Tienes una cuenta?
            <Link exact="true" to={{
                pathname: '/'
            }} onClick={props.toggleSignupBox}> Entrar</Link>
        </p>
    )
}

export default HasAccount;