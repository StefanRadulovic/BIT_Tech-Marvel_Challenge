import React, { Component } from 'react';
import './searchBar.css'


class Searchbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };
    }

    handleChange = (event) => {

        this.setState({
            searchValue: event.target.value
        });
        this.props.onSearch(event.target.value);
    }


    render() {
        return (
            <div className='search-bar'>
                <input className="input" type='search' placeholder="Search heroes" value={this.state.searchValue} onChange={this.handleChange} />
            </div>
        );
    }
}

export default Searchbar;