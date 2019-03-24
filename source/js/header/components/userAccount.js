import React from 'react';

import Dropdown from '../../widgets/dropdown';

import './userAccount.css';

class UserAccount extends React.Component {
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

    render() {
        return (
            <div className="col m4 hide-on-small-only">
                <div className="widgets">
                    <a href="#"><i className="far fa-compass header-account-buttons"></i></a>
                    <a href="#"><i className="far fa-heart header-account-buttons"></i></a>
                    <a className="dropdown-trigger btn" onClick={this.toggleDropdown}><i className="far fa-user header-account-buttons"></i></a>
                    {
                        this.state.viewDropdown &&
                        <Dropdown></Dropdown>
                    }
                </div>
            </div>
        )
    }
}

export default UserAccount