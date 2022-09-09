import React from 'react';
import Tracklist from './../Tracklist/Tracklist.js';
import './Playlist.css';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     disabled: false
        // };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.darkenButton = this.darkenButton.bind(this);
        this.lightenButton = this.lightenButton.bind(this);
    }

    componentDidMount() {
        const saveButton = document.getElementsByClassName("Playlist-save")[0];
        console.log(`after initial mount, savebutton is${saveButton.disabled}`)
    }

    render() {
        return(
            <div className="Playlist">
                <form 
                // onSubmit={(e) => {e.preventDefault()}}
                >
                    <input id="playlist-name" placeholder="Playlist Name" value={this.props.playlistName}  onChange={this.handleNameChange} required/>  
                    <p className="instructions">Add songs to build your playlist.</p>
                    <Tracklist tracks={this.props.playlistTracks}
                                onRemove={this.props.onRemove}
                                isRemoval={true}/>
                    <div className="buttons">
                        <input 
                            type="submit" 
                            value="SAVE TO SPOTIFY" 
                            className="Playlist-save" 
                            disabled={true} 
                            onMouseOver={this.darkenButton} 
                            onMouseOut={this.lightenButton} 
                            onClick={(e) => {
                                // e.preventDefault();
                                this.props.onSave();
                            }}
                        />
                        <a 
                            href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer">
                            VIEW PLAYLISTS ON WEB<img src={require("../../images/resize.png")} alt=""/>
                        </a>
                    </div>
                </form>
            </div>
        );
    }

    componentDidUpdate() {
        const saveButton = document.getElementsByClassName("Playlist-save")[0];
        console.log(`before enabling/disabling save, savebutton is${saveButton.disabled}`)
        if (this.props.playlistTracks.length === 1) this.enableSave();
        if (this.props.playlistTracks.length === 0) this.disableSave();
    }
    
    enableSave() {
        const playlistInstructions = document.getElementsByClassName("instructions")[0];
        const saveButton = document.getElementsByClassName("Playlist-save")[0];
        playlistInstructions.style.display = "none";
        saveButton.style.backgroundColor = '#9941ec';
        saveButton.style.color = 'white';
        saveButton.style.cursor = 'pointer';
        saveButton.disabled = false;
        // console.log(saveButton.disabled);
        console.log(`after enabling save, savebutton is${saveButton.disabled}`)
    }

    disableSave() {
        const playlistInstructions = document.getElementsByClassName("instructions")[0];
        const saveButton = document.getElementsByClassName("Playlist-save")[0];
        playlistInstructions.style.display = "";
        saveButton.style.backgroundColor = "";
        saveButton.style.color = '';
        saveButton.style.cursor = '';
        saveButton.style.cursor = '';
        saveButton.disabled = true;
        // console.log(saveButton.disabled);
        console.log(`after disabling save, savebutton is${saveButton.disabled}`)
    }

    darkenButton(e) {
        if (this.props.playlistTracks.length > 0) {
            const save = e.target;
            save.style.backgroundColor = "#7711d6";
        }
    }

    lightenButton(e) {
        if (this.props.playlistTracks.length > 0) {
            const save = e.target;
            save.style.backgroundColor = "#9941ec";
        }
    }

    handleNameChange(e) {
        const name = e.target.value; 
        this.props.onNameChange(name);
    }

}

export default Playlist; 