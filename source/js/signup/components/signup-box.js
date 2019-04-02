import React from 'react';
import axios from 'axios';

import PlatzigramTitle from '../../main/components/platzigram-title';
import SignupForm from './signup-form';
import HasAccount from './has-account';

import './signup-box.css';

class SignupBox extends React.Component {
    state = {
        signupMessage: ''
    }

    getFormData = (ev) => {
        ev.preventDefault();

        const data = new FormData(ev.target);

        const email = data.get('email');
        const name = data.get('name');
        const username = data.get('username');
        const password = data.get('password');

        const body = {
            email,
            name,
            username,
            password
        }
        
        this.submitFormData(body)
    }

    submitFormData = (body) => {
        return axios.post('/signup', body, {
            method: 'post'
        })
            .then(res => {
                console.log(`Axios ${JSON.stringify(res)}`)
                const flashMessage = res.data.message;

                if (flashMessage) {
                    return flashMessage

                } else {
                    const user = res.data.user

                    localStorage.setItem('user', JSON.stringify(user))
                    window.location.href = '/homepage'
                }
            })
            .then(flashMessage => {
                return this.renderFlashMessage(flashMessage)
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderFlashMessage = (flashMessage) => {
        this.setState({
            signupMessage: flashMessage
        })
    }

    render () {
        return (
            <div className="col s12 m7">
                <div className="row">
                    <div className="col s12 signup-box">
                        <div className="auth-box">
                            <PlatzigramTitle></PlatzigramTitle>
                            <SignupForm getFormData={this.getFormData} flashMessage={this.state.signupMessage}></SignupForm>
                        </div>
                        <div className="has-account-box">
                            <HasAccount toggleSignupBox={this.props.toggleSignupBox}></HasAccount>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupBox;