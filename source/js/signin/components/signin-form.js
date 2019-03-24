import React from 'react';

function SigninForm (props) {
    return (
        <div className="row">
            <div className="col s12">
                <form className="main-form" onSubmit={props.getFormData}>
                    <input className="input-form" type="email" name="email" placeholder="Correo Electronico" />
                    <input className="input-form" type="password" name="password" placeholder="Contraseña" />
                    {
                        props.signinMessage &&
                        <div>
                            <span className="span-flash-message">{props.signinMessage}</span>
                        </div>
                    }
                    <button className="submit-button" type="submit">Entrar</button>
                    <div className="divider"></div>
                    <button className="fb-auth">
                        <span><i className="fab fa-facebook"></i></span>
                        Iniciar sesión con Facebook
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SigninForm;