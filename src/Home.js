import React from 'react';
import './App.css';
import SearchResults from './Components/SearchResults/SearchResults.js'
import Playlist from './Components/Playlist/Playlist.js'
import SearchBar from './Components/SearchBar/SearchBar.js';
import Spotify from './Components/util/Spotify.js';

class Home extends React.Component {     

  constructor(props) {
    super(props);
    this.state = {
      searchResults : [],
      playlistName : "",
      playlistTracks :  []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
 
  render() {
    //ma name jeff
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );  
  }

  componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  }

  addTrack(track) {
    const currentPlaylist = this.state.playlistTracks;
    const isSame = currentPlaylist.some(existingTrack => existingTrack.id === track.id);
    if (isSame === false) {
        currentPlaylist.push(track);
        this.setState({playlistTracks : currentPlaylist});
    }
  }

  removeTrack(track) {
    const currentPlaylist = this.state.playlistTracks;
    const newPlaylist = currentPlaylist.filter(existingTrack => existingTrack.id !== track.id);
    this.setState({playlistTracks : newPlaylist });
  }

  updatePlaylistName(newName) {
    this.setState({playlistName : newName});
  }

  savePlaylist() {
      const trackURIs = this.state.playlistTracks.map(track => track.uri); 
      Spotify.savePlaylist(this.state.playlistName, trackURIs);
      this.setState({playlistName : ''});
      this.setState({playlistTracks : []})
      const playlistName = document.getElementById("playlist-name");
      playlistName.placeholder="Playlist Name";
  }

  search(searchParameter) {
    Spotify.search(searchParameter).then(searchResults => {
      this.setState({searchResults : searchResults})
    })
  }

}

export default Home;
