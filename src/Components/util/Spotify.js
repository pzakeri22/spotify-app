export let accessToken;
export const client_id = 'a038457604634aac9a912fff8748b31d';
export const redirect_uri = 'http://localhost:3000/home';  //stored here and under app settings on spotify developer site
// export const redirect_uri = 'https://pzakeri22.github.io/spotify-app/home';  //stored here and under app settings on spotify developer site

export const authorise = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}&show_dialog=true`;

const Spotify = {
    //obtains access token so user can make requests to the Spotify API. 
    //If no access token, will attempt authorization (granting user/application permissions to spotify data) which generates access token.
    getAccessToken() {
      if (accessToken) {
          return accessToken;
      }
      //After authorization, you will recieve an access token in the current webpage's url, e.g. https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123
      //If the access token is not already set, check the URL to see if it has just been obtained.
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);   
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if(accessTokenMatch && expiresInMatch) {
          accessToken = accessTokenMatch[1];
          // const expiresIn = Number(expiresInMatch[1]);
          // the below clears the access token, allowing us to grab a new one when it expires.
          window.setTimeout(() => accessToken ="", 900000);
          //1- To modify current URL and add / inject it (the new modified URL) as a new URL entry to history list, use pushState:
          // This adds (pushes) a new "state" onto the browser history, so that in future, the user will be able to return to this state that the web-page is now in.
          //For example, if a user does a search "CATS" in one of your search boxes, and the results of the search (pictures of cats) are loaded back via AJAX, -- then your page state will not be changed. 
          //In other words, in the near future, when the user decides that he wants to go back to his search for "CATS", he won't be able to, because the state doesn't exist in his history. 
          //He will only be able to click back to your blank search box.
          //history.pushState({},"Results for `Cats`",'url.html?s=cats');
          //When the function is working properly, the only thing you should expect to see, is the address in your browser's address-bar change to whatever you specify in your URL.
          window.history.pushState('Access Token', null, '/home');
          return accessToken;
      }
          // const accessURL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}&show_dialog=true`;
          //the below redirects you to the homepage with instructions and a link to authorise.
          window.location = '../'; 
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

