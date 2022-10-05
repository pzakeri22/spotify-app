import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm : "",
            invalidTerm : false
        };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        return (
            <div className="SearchBar">
                <div className={`warning visible-${this.state.invalidTerm}`}><p>Invalid characters: ` % ^ & * + { } ; # \ |</p> </div>
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
        const searchTerm = e.target.value;
        const invalidCharas = ["`","%", "^", "&", "*", "+", "{", "}", ";", "#", "\\", "|"];
        if (invalidCharas.some(chara => searchTerm.includes(chara))) {
            this.setState({invalidTerm : true});
            setTimeout(() => {
                this.setState({invalidTerm : false})
            }, 5000)
            return;
        }
        this.setState({searchTerm : searchTerm});
    }

    search() {  
        if (this.state.searchTerm === "") {
            return;
        }
        this.props.onSearch(this.state.searchTerm);
    }
}

export default SearchBar;



