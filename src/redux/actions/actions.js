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
export const GET_SNAPSHOT_ID = 'GET_SNAPSHOT_ID';

// Step 1: Begin Authorization

export const handleAuthURI = () => (dispatch, getState) => {
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
  return data;
};

export const handleSliderValue = (data) => (dispatch) => {
  dispatch({ type: HANDLE_SLIDER_VALUE, payload: data });
  return data;
};
// Step 5: Create a New Playlist
export const handlePlaylistCreation = (
  userId,
  playlistName,
  description,
  privacy,
  token
) => (dispatch) => {
  return axios
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
    .catch((err) => {
      console.log(err);
    });
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
export const handleSearch = (
  query,
  genre,
  finalSliderValue,
  numSongs,
  token
) => (dispatch) => {
  return axios
    .get(
      `https://api.spotify.com/v1/search?query=${query}*+genre%3A${genre}+year%3A+${finalSliderValue[0]}-${finalSliderValue[1]}&type=track&offset=0&limit=${numSongs}`,
      { headers: { Authorization: 'Bearer' + ' ' + token } }
    )
    .then((res) => {
      dispatch({ type: SEARCH_SONGS, payload: res.data.tracks.items });
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
};
// Step 8: Get URIs
export const handleTrackUris = (searchResults) => (dispatch) => {
  let uriList = [...new Set(searchResults.map((song) => song.uri))];
  dispatch({ type: GET_TRACK_URIS, payload: uriList });
  return uriList;
  // setUris(uriList);
};
// Step 9: Add Songs to playlist

export const addToPlaylist = (playlistId, trackUris, token) => (dispatch) => {
  return axios
    .post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris: trackUris },
      { headers: { Authorization: 'Bearer' + ' ' + token } }
    )
    .then((res) => {
      console.log('Success adding to playlist!');
      dispatch({ type: GET_SNAPSHOT_ID, payload: res.snapshot_id });
      return res.snapshot_id;
    })
    .catch((err) => console.log(err));
};

export const generatePlaylists = (data) => (dispatch) => {
  dispatch(handleAuthURI());
  dispatch(handleToken());
  dispatch(handleUserInfo());
  dispatch(handleFormValues(data.formValues));
  dispatch(handleSliderValue(data.sliderValue));
  dispatch(
    handlePlaylistCreation(
      data.userId,
      data.playlistName,
      data.description,
      data.privacy,
      data.token
    )
  );
  dispatch(randomizeQuery());
  dispatch(
    handleSearch(
      data.query,
      data.genre,
      data.finalSliderValue,
      data.numSongs,
      data.token
    )
  );
  dispatch(handleTrackUris(data.searchResults));
  dispatch(addToPlaylist(data.playlistId, data.trackUris, data.token));
};
