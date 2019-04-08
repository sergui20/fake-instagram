import React from 'react';

import { Link } from 'react-router-dom';

function NoAccount (props) {
    return (
        <p className="has-account-p">
            Don't have an account ?
            <Link exact="true" to={{
                pathname: '/signup'
            }} onClick={props.toggleSignupBox}> Sign up</Link>
        </p>
    )
}

export default NoAccount;