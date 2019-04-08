import React from 'react';

import './signup-form.css';

function SignupForm (props) {
    return (
        <div className="row">
            <div className="col s12">
                <form className="main-form" onSubmit={props.getFormData}>
                    <button className="fb-auth">
                        <span><i className="fab fa-facebook"></i></span>
                        Sign up with Facebook
                    </button>
                    <div className="divider"></div>
                    <input className="input-form" type="email" name="email" placeholder="Email" />
                    <input className="input-form" type="text" name="name" placeholder="Full name" />
                    <input className="input-form" type="text" name="username" placeholder="Username" />
                    <input className="input-form" type="password" name="password" placeholder="Password" />
                    {
                        props.flashMessage.length > 0 &&
                        <div>
                            <span className="span-flash-message">{props.flashMessage}</span>
                        </div>
                    }
                    <button className="submit-button" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default SignupForm;