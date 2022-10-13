export let accessToken;
export const client_id = 'a038457604634aac9a912fff8748b31d';
export const redirect_uri = 'https://spotifyplaylistapp.netlify.app/home'; // 'http://localhost:3000/home' stored here and under app settings on spotify developer site
export const authorise = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}&show_dialog=true`;

const Spotify = {
    //obtains access token so user can make requests to the Spotify API. 
    getAccessToken() {
      if (accessToken) {
          return accessToken;
      }
      //After authorization, you will recieve an access token in the current webpage's url
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);   
      // const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if(accessTokenMatch) {
          accessToken = accessTokenMatch[1];
          //clears the access token, allowing us to grab a new one when it expires.
          window.setTimeout(() => accessToken ="", 900000);
          //modify current URL and add / inject it (the new modified URL) as a new URL entry to history list:
          window.history.pushState('Access Token', null, '/home');
          return accessToken;
      }
          //redirects you to the homepage with instructions and a link to authorise.
          window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}&show_dialog=true`;
        },

    async search(searchTerm) {
        const accessToken = Spotify.getAccessToken();    
        const headers = {
            headers: {Authorization: `Bearer ${accessToken}`}
        }
        try {
          const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, headers);
          if (response.ok) {
            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                return []; 
            } else {
                return jsonResponse.tracks.items.map(track => ({ 
                      id: track.id,
                      name: track.name,
                      artist: track.artists[0].name,
                      album: track.album.name,
                      uri: track.uri,
                      preview: track.preview_url
                }));
            }
          }
          throw new Error('Request Failed!');  
        } catch (error) { 
          console.log(error); 
        }
      },

    savePlaylist(playlistName, trackURIs) {
      if (!playlistName || !trackURIs) {
        return;
      }
      const accessToken = Spotify.getAccessToken();  
      const headers = {Authorization: `Bearer ${accessToken}`};
      let userID;
      let playlistID;

      async function asyncGetID() {
        const response = await fetch(`https://api.spotify.com/v1/me`, {
          headers: headers
        })
        let jsonResponse;
        if (response.ok) {
          jsonResponse = await response.json();
        }
        else {
          throw new Error(`Request Failed! ${response.status}, ${response.message}`);  
        }
        userID = jsonResponse.id;
      }

      async function asyncCreatePlaylist() {
        const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          playlistID = jsonResponse.id;
        } else {
          throw new Error(`Request failed! ${response.status}, ${response.message}`);
        }
      }

      async function asyncUpdatePlaylist() {
        const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURIs})
        });
        if (response.ok) { 
          return;
        } 
        throw new Error(`Request failed! ${response.status}, ${response.message}`);
      }

      async function save() {
        try {
          await asyncGetID();
          await asyncCreatePlaylist();
          await asyncUpdatePlaylist();
        } catch (error) { 
          console.log(error); 
        }
      }

      save();
  } 
      
}



export default Spotify;

