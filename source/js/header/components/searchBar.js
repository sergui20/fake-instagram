import React from 'react';

import './searchBar.css';

class SearchBar extends React.Component {
    render() {
        return (
            <div className="col s5 m4">
                <div className="searchBar">
                    <form action={true} className="form-header">
                        <input className="input-header" method="get" encType="text/plain" type="text" name="search" placeholder="Search"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchBar;