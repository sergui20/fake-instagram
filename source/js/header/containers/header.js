import React from 'react';

import HeaderNav from '../components/headerNav';

import Logo from '../components/logo';
import SearchBar from '../components/searchBar';
import Account from '../components/userAccount';
import MobileAccount from '../components/userBarsAccount';

class Header extends React.Component {
    render() {
        return (
            <HeaderNav>
                <Logo></Logo>
                <SearchBar></SearchBar>
                <Account></Account>
                <MobileAccount></MobileAccount>
            </HeaderNav>
        )
    }
}
export default Header;