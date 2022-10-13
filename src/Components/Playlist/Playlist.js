import React from 'react';
import Tracklist from './../Tracklist/Tracklist.js';
import './Playlist.css';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: false
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    render() {
        let saveDisabled = this.props.playlistTracks.length === 0;

        return (
            <div className="Playlist">
                <form onSubmit={this.props.onSave}>
                    <input 
                        id="playlist-name" 
                        placeholder="Playlist Name" 
                        value={this.props.playlistName}  
                        onChange={this.handleNameChange} 
                        type="text"
                        required
                    />  
                    <p className={`instructions visible-${saveDisabled}`}>
                        Add songs to build your playlist, then view your playlists on the web.
                    </p>
                    <Tracklist 
                        tracks={this.props.playlistTracks}
                        onRemove={this.props.onRemove}
                        isRemoval={true}
                    />
                    <div className="buttons">
                        <input 
                            type="submit" 
                            value={this.state.saved? "SAVED ✔" : "SAVE TO SPOTIFY"} 
                            className={`saveButton disabled-${saveDisabled} saved-${this.state.saved}`}
                            disabled={saveDisabled} 
                            onClick={this.handleSave}
                        />
                        <a 
                            href="https://open.spotify.com/" 
                            target="_blank" 
                            rel="noopener 
                            noreferrer"
                        >
                            VIEW PLAYLISTS ON WEB
                            <img 
                                src={require("../../images/resize.png")} 
                                alt=""
                            />
                        </a>
                    </div>
                </form>
            </div>
        );
    }

    handleSave() {
        const inputname = document.getElementById("playlist-name");
        if (inputname.value === "") return;
        setTimeout(() => {
            this.setState({saved: true})
        }, 1)
        setTimeout(() => {
            this.setState({saved: false})
        }, 3000)
        this.props.onSave();

    }

    handleNameChange(e) {
        const name = e.target.value; 
        this.props.onNameChange(name);
    }

}

export default Playlist;