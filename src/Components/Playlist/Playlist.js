import React from 'react';
import Tracklist from './../Tracklist/Tracklist.js';
import './Playlist.css';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    render() {
        return(
            <div className="Playlist">
                <input placeholder="Playlist Name" value={this.props.playlistName}  onChange={this.handleNameChange} />  
                <Tracklist tracks={this.props.playlistTracks}
                            onRemove={this.props.onRemove}
                            isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }

    handleClick(e) {
        e.target.placeholder = "";
        this.props.onNameChange(e.target.value);
    }

    handleNameChange(e) {
        const name = e.target.value; 
        this.props.onNameChange(name);
    }

}

export default Playlist; 