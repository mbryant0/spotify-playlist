import axios from 'axios';
import { randomCharacters } from '../../assets/RandomCharacters';
export const GET_URI = 'GET_URI';
export const HANDLE_TOKEN = 'HANDLE_TOKEN';
export const GET_USER_INFO = 'GET_USER_INFO';
export const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
export const RANDOMIZE_QUERY = 'RANDOMIZE_QUERY';
export const SEARCH_SONGS = 'SEARCH_SONGS';
export const GET_TRACK_URIS = 'GET_TRACK_URIS';
export const HANDLE_FORM_VALUES = 'HANDLE_FORM_VALUES';
export const HANDLE_SLIDER_VALUE = 'HANDLE_SLIDER_VALUE';

// Step 1: Begin Authorization

export const handleAuthURI = () => (dispatch) => {
  return axios
    .get('http://localhost:2019/authorize')
    .then((res) => {
      dispatch({ type: GET_URI, payload: res.data });
    })
    .catch((err) => {
      console.log('Error occurred', err);
    });
};
// Step 2: Save Token

// Step 3: Put Token in State
export const handleToken = () => (dispatch) => {
  return (
    axios
      .get('http://localhost:2019/token')
      .then((res) => {
        dispatch({ type: HANDLE_TOKEN, payload: res.data });
      })

      //setToken(res.data);
      .catch((err) => {
        console.log(err);
      })
  );
};

// Step 4: Save User Info in State

export const handleUserInfo = () => (dispatch) => {
  return (
    axios
      .get('http://localhost:2019/me')
      .then((res) => {
        dispatch({ type: GET_USER_INFO, payload: res.data.id });
      })
      //setUserId(res.data.id);
      // console.log(res.data.id);
      .catch((err) => {
        console.log('Error occurred while retrieving profile information', err);
      })
  );
};
export const handleFormValues = (data) => (dispatch) => {
  dispatch({ type: HANDLE_FORM_VALUES, payload: data });
  return console.log('Success: ', data);
};

export const handleSliderValue = (data) => (dispatch) => {
  dispatch({ type: HANDLE_SLIDER_VALUE, payload: data });
};
// Step 5: Create a New Playlist
export const handlePlaylistCreation = (
  userId,
  playlistName,
  description,
  privacy,
  token
) => (dispatch) => {
  return (
    axios
      .post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: playlistName,
          description: description,
          public: privacy.toString(),
        },
        { headers: { Authorization: 'Bearer' + ' ' + token } }
      )
      .then((res) => {
        dispatch({ type: CREATE_PLAYLIST, payload: res.data.id });
        console.log(res.data.id);
      })
      //setPlaylistId(res.data.id);
      .catch((err) => {
        console.log(err);
      })
  );
};

// Step 6: Get Query Seed

export const randomizeQuery = () => (dispatch) => {
  var result = '';
  result =
    randomCharacters[Math.floor(Math.random() * randomCharacters.length)];
  dispatch({ type: RANDOMIZE_QUERY, payload: result });
  //setQuery(result);
  return result;
};

// Step 7: Search for songs
export const handleSearch = ({ query, formValues, sliderValue, token }) => (
  dispatch
) => {
  return (
    axios
      .get(
        `https://api.spotify.com/v1/search?query=${query}*+genre%3A${formValues.genre}+year%3A+${sliderValue[0]}-${sliderValue[1]}&type=track&offset=0&limit=${formValues.numSongs}`,
        { headers: { Authorization: 'Bearer' + ' ' + token } }
      )
      .then((res) => {
        dispatch({ type: SEARCH_SONGS, payload: res.data.tracks.items });
      })
      // setSearchResults(res.data.tracks.items);
      //console.log(searchResults);
      .catch((err) => {
        console.log('Error: ', err);
      })
  );
};
// Step 8: Get URIs
export const handleTrackUris = ({ searchResults }) => (dispatch) => {
  let uriList = [...new Set(searchResults.map((song) => song.uri))];
  dispatch({ type: GET_TRACK_URIS, payload: uriList });
  return uriList;
  // setUris(uriList);
};
// Step 9: Add Songs to playlist

export const addToPlaylist = ({ playlistId, trackUris, token }) => {
  return axios
    .post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris: trackUris },
      { headers: { Authorization: 'Bearer' + ' ' + token } }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
