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
export const RANDOMIZE_OFFSET = 'RANDOMIZE_OFFSET';
export const GET_PLAYLIST_URL = 'GET_PLAYLIST_URL';
export const SUCCESS_ALERT = 'SUCCESS_ALERT';

// Step 1: Begin Authorization

export const handleAuthURI = () => (dispatch) => {
  return axios
    .get('/api/authorize')
    .then((res) => {
      dispatch({ type: GET_URI, payload: res.data });
      console.log('1');
    })
    .catch((err) => {
      console.log('Error occurred', err);
    });
};

// Step 2: Save Token in State

export const handleToken = () => (dispatch) => {
  return axios
    .get('/api/token')
    .then((res) => {
      dispatch({ type: HANDLE_TOKEN, payload: res.data });
      console.log('2');
    })
    .catch((err) => {
      console.log(err);
    });
};

// Step 3: Save User Info in State

export const handleUserInfo = () => (dispatch) => {
  return axios
    .get('/api/me')
    .then((res) => {
      dispatch({ type: GET_USER_INFO, payload: res.data.id });
      console.log('3');
    })
    .catch((err) => {
      console.log('Error occurred while retrieving profile information', err);
    });
};

// Step 4: Save Form Values in State

export const handleFormValues = (data) => (dispatch) => {
  dispatch({ type: HANDLE_FORM_VALUES, payload: data });
  console.log('4');
  return data;
};

// Step 5: Save Slider Values in State

export const handleSliderValue = (data) => (dispatch) => {
  dispatch({ type: HANDLE_SLIDER_VALUE, payload: data });
  console.log('5');
  return data;
};

// Step 6: Create a New Playlist

export const handlePlaylistCreation = () => (dispatch, getState) => {
  let state = getState();
  const userId = state.userId;
  const playlistName = state.playlistName;
  const description = state.description;
  const privacy = state.privacy;
  const token = state.token;
  return axios
    .post(
      `/spotifyapi/v1/users/${userId}/playlists`,
      {
        name: playlistName,
        description: description,
        public: privacy.toString(),
      },
      { headers: { Authorization: 'Bearer' + ' ' + token } }
    )
    .then((res) => {
      dispatch({ type: CREATE_PLAYLIST, payload: res.data.id });
      console.log('6');
    })
    .catch((err) => {
      console.log(err);
    });
};

// Step 7: Retrieve Query Seed

export const randomizeQuery = (length) => (dispatch) => {
  var result = '';
  result =
    randomCharacters[Math.floor(Math.random() * randomCharacters.length)];
  dispatch({ type: RANDOMIZE_QUERY, payload: result });
  console.log('7');
  return result;
};

// Step 8: Retrieve offset
export const randomizeOffset = () => (dispatch) => {
  var result = '';
  result = Math.floor(Math.random() * 500 + 1);
  dispatch({ type: RANDOMIZE_OFFSET, payload: result });
  console.log('8: The offset is: ', result);
  return result;
};

// Step 9: Search for songs

export const handleSearch = () => (dispatch, getState) => {
  let state = getState();
  const query = state.query;
  const genre = state.genre;
  const finalSliderValue = state.finalSliderValue;
  const numSongs = state.numSongs;
  const token = state.token;
  const offset = state.offset;
  return axios
    .get(
      `/spotifyapi/v1/search?query=${query}*+genre%3A${genre}+year%3A+${finalSliderValue[0]}-${finalSliderValue[1]}&type=track&offset=${offset}&limit=${numSongs}`,
      { headers: { Authorization: 'Bearer' + ' ' + token } }
    )
    .then((res) => {
      dispatch({ type: SEARCH_SONGS, payload: res.data.tracks.items });
      console.log('9');
    })
    .catch((err) => {
      console.log('Err: ', err);
    });
};

// Step 10: Retrieve Track URIs from Search Results

export const handleTrackUris = () => (dispatch, getState) => {
  let state = getState();
  const searchResults = state.searchResults;
  let uriList = [...new Set(searchResults.map((song) => song.uri))];
  dispatch({ type: GET_TRACK_URIS, payload: uriList });
  console.log('10');
  return uriList;
};

// Step 11: Add Songs to playlist

export const addToPlaylist = () => (dispatch, getState) => {
  let state = getState();
  const playlistId = state.playlistId;
  const trackUris = state.trackUris;
  const token = state.token;
  return axios
    .post(
      `/spotifyapi/v1/playlists/${playlistId}/tracks`,
      { uris: trackUris },
      { headers: { Authorization: 'Bearer' + ' ' + token } }
    )
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_PLAYLIST_URL, payload: res.config.url });
      dispatch({ type: SUCCESS_ALERT, payload: true });
      return res.snapshot_id;
    })
    .catch((err) => console.log(err));
};

// Step 11: Combine all action creators in sequential order

export const generatePlaylists = (data) => (dispatch) => {
  dispatch(handleAuthURI())
    .then(() => {
      return dispatch(handleToken());
    })
    .then(() => {
      return dispatch(handleUserInfo());
    })
    .then(() => {
      return dispatch(handleFormValues(data.formValues));
    })
    .then(() => {
      return dispatch(handleSliderValue(data.sliderValue));
    })
    .then(() => {
      return dispatch(handlePlaylistCreation());
    })
    .then(() => {
      return dispatch(randomizeQuery());
    })
    .then(() => {
      return dispatch(randomizeOffset());
    })
    .then(() => {
      return dispatch(handleSearch());
    })
    .then(() => {
      return dispatch(handleTrackUris());
    })
    .then(() => {
      return dispatch(addToPlaylist());
    });
};
