import React from 'react';

import './signup-form.css';

function SignupForm (props) {
    return (
        <div className="row">
            <div className="col s12">
                <form className="main-form" onSubmit={props.getFormData}>
                    <button className="fb-auth">
                        <span><i className="fab fa-facebook"></i></span>
                        Iniciar sesión con Facebook
                    </button>
                    <div className="divider"></div>
                    <input className="input-form" type="email" name="email" placeholder="Correo Electronico" />
                    <input className="input-form" type="text" name="name" placeholder="Nombre Completo" />
                    <input className="input-form" type="text" name="username" placeholder="Nombre de usuario" />
                    <input className="input-form" type="password" name="password" placeholder="Contraseña" />
                    {
                        props.flashMessage.length > 0 &&
                        <div>
                            <span className="span-flash-message">{props.flashMessage}</span>
                        </div>
                    }
                    <button className="submit-button" type="submit">Regístrate</button>
                </form>
            </div>
        </div>
    )
}

export default SignupForm;