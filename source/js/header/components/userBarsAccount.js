import React from 'react';

import Dropdown from '../../widgets/dropdown';

import './userBarsAccount.css';

class BarsAccount extends React.Component {
    state = {
        viewDropdown: false
    }

    toggleDropdown = () => {
        if (!this.state.viewDropdown) {
            this.setState({
                viewDropdown: true
            })

            document.addEventListener('click', this.tooggleEventListener)
        }
    }

    tooggleEventListener = () => {
        this.setState({
            viewDropdown: false
        })

        document.removeEventListener('click', this.tooggleEventListener)
    }

    logout = () => {
        document.cookie = 'Authorization=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/homepage';
        console.log(document.cookie)

        window.location.href = '/logout'
    }

    render() {
        return (
            <div className="col s2 hide-on-med-and-up settings-bar">
                <a className="dropdown-trigger" onClick={this.toggleDropdown}><i className="fas fa-bars"></i></a>
                {
                    this.state.viewDropdown &&
                    <Dropdown logout={this.logout}></Dropdown>
                }
            </div>
        )
    }
}

export default BarsAccount;