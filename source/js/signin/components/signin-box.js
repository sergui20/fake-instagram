import React from 'react';
import axios from 'axios';

import PlatzigramTitle from '../../main/components/platzigram-title';
import SigninForm from './signin-form';
import NoAccount from './dont-has-account';

class SigninBox extends React.Component {
    state = {
        signinMessage: ''
    }

    getFormData = (ev) => {
        ev.preventDefault();

        const data = new FormData(ev.target);

        const email = data.get('email');
        const password = data.get('password');

        const body = {
            email,
            password
        }

        this.submitFormData(body)
    }

    submitFormData = (body) => {
        return axios.post('/signin', body)
            .then(res => {
                const flashMessage = res.data.message;

                if (flashMessage) {
                    return flashMessage

                } else {
                    const user = res.data.user
                    console.log(`ID Signin: ${JSON.stringify(user)}`)
                    localStorage.setItem('user', JSON.stringify(user))
                    window.location.href = '/homepage'
                }
            })
            .then(flashMessage => {
                return this.renderFlashMessage(flashMessage)
            })
    }

    renderFlashMessage = (flashMessage) => {
        this.setState({
            signinMessage: flashMessage
        })
    }

    render () {
        return (
            <div className="col s12 m7">
                <div className="row">
                    <div className="col s12 signup-box">
                        <div className="auth-box">
                            <PlatzigramTitle></PlatzigramTitle>
                            <SigninForm getFormData={this.getFormData} signinMessage={this.state.signinMessage}></SigninForm>
                        </div>
                        <div className="has-account-box">
                            <NoAccount toggleSignupBox={this.props.toggleSignupBox}></NoAccount>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SigninBox;