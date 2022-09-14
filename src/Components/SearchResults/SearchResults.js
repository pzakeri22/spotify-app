import React from 'react';
import Tracklist from './../Tracklist/Tracklist.js'; 
import './SearchResults.css';
import LoginError from './LoginError.js';

class SearchResults extends React.Component {   
    render() {
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <LoginError>
                <Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
                </LoginError>
            </div>
        )
    }
}

export default SearchResults;

 