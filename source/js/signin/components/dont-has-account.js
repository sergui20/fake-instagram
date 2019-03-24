import React from 'react';

import { Link } from 'react-router-dom';

function NoAccount (props) {
    return (
        <p className="has-account-p">
            ¿No tienes una cuenta?
            <Link exact="true" to={{
                pathname: '/signup'
            }} onClick={props.toggleSignupBox}> Regístrate</Link>
        </p>
    )
}

export default NoAccount;