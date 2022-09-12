import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm : ""};
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album or Artist" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress}/>     
                <button className="SearchButton" onClick={this.search}>SEARCH</button>       
            </div>
        );
    }

    handleKeyPress(e) {
        if(e.key === 'Enter') {
            this.search(); 
        }
    }

    handleTermChange = (e) => {
        const parameter = e.target.value;
        this.setState({searchTerm : parameter});
    }

    search() {  
        if (this.state.searchTerm === "") {
            return;
        }
        this.props.onSearch(this.state.searchTerm);
    }
}

export default SearchBar;



