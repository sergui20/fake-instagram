import React from 'react';

import IphonePic from './iphone-pic';

import SignupBox from '../../signup/components/signup-box';
import SigninBox from '../../signin/components/signin-box';

import '../../../css/styles.css'

class MainComponent extends React.Component {
    state = {
        signupBox: false
    }

    toggleSignupBox = () => {
        this.setState({
            signupBox: ! this.state.signupBox
        })
    }

    componentDidMount() {
        if(this.props.match.url === '/signup') {
            this.setState({
                signupBox: true
            })
        }
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s10 push-s1">
                        <div className="row">
                            <IphonePic></IphonePic>
                            {
                                this.state.signupBox ?
                                <SignupBox toggleSignupBox={this.toggleSignupBox}></SignupBox>
                                :
                                <SigninBox toggleSignupBox={this.toggleSignupBox}></SigninBox>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainComponent;