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
export const LOADING_START = 'LOADING_START';
export const ALERT_MESSAGE = 'ALERT_MESSAGE';
export const LOADING_FINISH = 'LOADING_FINISH';
export const SUCCESS_FINISH = 'SUCCESS_FINISH';
export const ACCESS_CODE_SUCCESS = 'ACCESS_CODE_SUCCESS';
export const START_AUTHORIZATION = 'START_AUTHORIZATION';
export const LOADING_DONE = 'LOADING_DONE';

//https://spotify-playlist-backend2021.herokuapp.com
//http://localhost:2025

// Step 1: Begin Authorization

export const handleAuthURI = () => (dispatch) => {
  dispatch({ type: SUCCESS_FINISH });
  return axios.get('http://localhost:2025/authorize').then((res) => {
    localStorage.setItem('validated', true);
    dispatch({ type: GET_URI, payload: res.data });
  });
};

// Step 2: Redirect User to Authorization URI

export const redirect = () => (dispatch, getState) => {
  let state = getState();
  const authUri = state.authUri;
  dispatch({ type: LOADING_DONE });
  return (window.location.href = authUri);
};

// Step 3: Combine Steps 1 and 2 into a single action creator
export const initialAuthorize = (e) => (dispatch) => {
  e.preventDefault();
  dispatch({ type: START_AUTHORIZATION });
  dispatch(handleAuthURI()).then(() => {
    return dispatch(redirect());
  });
};

// Step 4: Parse Auth Code from URL

export const retrieveCodeFromURL = () => (dispatch) => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  dispatch({ type: ACCESS_CODE_SUCCESS, payload: code });
};

// Step 5: Save Token in State

export const handleToken = () => (dispatch, getState) => {
  let state = getState();
  const code = state.code;
  return axios
    .get(`http://localhost:2025/getcredentials?code=${code}`)
    .then((res) => {
      localStorage.setItem('token', res.data.accessToken);
    });
};

// Step 6: Combine Steps 3 and 4 into a single action creator
export const getToken = () => (dispatch) => {
  dispatch(retrieveCodeFromURL()).then(() => {
    return dispatch(handleToken());
  });
};

// Step 7: Save User Id in State

export const handleUserInfo = () => (dispatch) => {
  return axios.get('http://localhost:2025/me').then((res) => {
    dispatch({
      type: ALERT_MESSAGE,
      payload: { alertMessage: 'One moment...', variant: 'warning' },
    });
    dispatch({ type: GET_USER_INFO, payload: res.data.id });
    dispatch({ type: LOADING_START });
  });
};

// Step 8: Save Form Values in Global Application State

export const handleFormValues = (data) => (dispatch) => {
  return dispatch({ type: HANDLE_FORM_VALUES, payload: data });
};

// Step 9: Save Slider Values in Global Application State

export const handleSliderValue = (data) => (dispatch, getState) => {
  let state = getState();
  const playlistName = state.playlistName;
  dispatch({
    type: ALERT_MESSAGE,
    payload: {
      alertMessage: `Now loading "${playlistName}"... `,
      variant: 'warning',
    },
  });
  return dispatch({ type: HANDLE_SLIDER_VALUE, payload: data });
};

// Step 10: Create a New Playlist

export const handlePlaylistCreation = () => (dispatch, getState) => {
  let state = getState();
  const userId = state.userId;
  const playlistName = state.playlistName;
  const description = state.description;
  const privacy = state.privacy;
  return axios
    .post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: playlistName,
        description: description,
        public: privacy.toString(),
      },
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
    )
    .then((res) => {
      dispatch({ type: CREATE_PLAYLIST, payload: res.data.id });
      dispatch({
        type: GET_PLAYLIST_URL,
        payload: res.data.external_urls.spotify,
      });
    });
};

// Step 11: Retrieve Query Seed

export const randomizeQuery = () => (dispatch) => {
  var result = '';
  result =
    randomCharacters[Math.floor(Math.random() * randomCharacters.length)];
  return dispatch({ type: RANDOMIZE_QUERY, payload: result });
};

// Step 12: Retrieve offset

export const randomizeOffset = () => (dispatch) => {
  var result = '';
  result = Math.floor(Math.random() * 500 + 1);
  return dispatch({ type: RANDOMIZE_OFFSET, payload: result });
};

// Step 13: Search for songs

export const handleSearch = () => (dispatch, getState) => {
  let state = getState();
  const query = state.query;
  const genre = state.genre;
  const finalSliderValue = state.finalSliderValue;
  const numSongs = state.numSongs;
  const offset = state.offset;
  return axios
    .get(
      `https://api.spotify.com/v1/search?query=${query}*+genre%3A${genre}+year%3A+${finalSliderValue[0]}-${finalSliderValue[1]}&type=track&offset=${offset}&limit=${numSongs}`,
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
    )
    .then((res) => {
      dispatch({ type: SEARCH_SONGS, payload: res.data.tracks.items });
      dispatch({
        type: ALERT_MESSAGE,
        payload: {
          alertMessage: 'Retrieving your tunes...',
          variant: 'warning',
        },
      });
    });
};

// Step 14: Retrieve Track URIs from Search Results

export const handleTrackUris = () => (dispatch, getState) => {
  let state = getState();
  const searchResults = state.searchResults;
  let uriList = [...new Set(searchResults.map((song) => song.uri))];
  return dispatch({ type: GET_TRACK_URIS, payload: uriList });
};

// Step 15: Add Songs to playlist

export const addToPlaylist = () => (dispatch, getState) => {
  let state = getState();
  const playlistId = state.playlistId;
  const trackUris = state.trackUris;
  return axios
    .post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris: trackUris },
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
    )
    .then(() => {
      dispatch({
        type: LOADING_FINISH,
      });
      dispatch({ type: SUCCESS_ALERT });
    })
    .catch(() => {
      dispatch({
        type: ALERT_MESSAGE,
        payload: {
          alertMessage: `An error has occurred 😥. Please refresh and try again.`,
          variant: 'danger',
        },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('validated');
    });
};

// Step 16: Combine all action creators in sequential order

export const generatePlaylists = (data) => (dispatch) => {
  dispatch(handleUserInfo())
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
