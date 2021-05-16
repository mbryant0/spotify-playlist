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

// Step 1: Begin Authorization

export const handleAuthURI = () => (dispatch) => {
  dispatch({ type: SUCCESS_FINISH });

  return axios
    .get('https://spotify-playlist-backend2021.herokuapp.com/authorize')
    .then((res) => {
      localStorage.setItem('validated', true);
      dispatch({ type: GET_URI, payload: res.data });
    })
    .catch((err) => {
      console.log('Please check your internet connection', err);
    });
};

// Step 2: Save Token in State

export const handleToken = () => (dispatch, getState) => {
  let state = getState();
  const code = state.code;
  return axios
    .get(
      `https://spotify-playlist-backend2021.herokuapp.com/getcredentials?code=${code}`
    )
    .then((res) => {
      localStorage.setItem('token', res.data.accessToken);
    })
    .catch((err) => {});
};

// Step 3: Save User Info in State

export const handleUserInfo = () => (dispatch) => {
  return axios
    .get('https://spotify-playlist-backend2021.herokuapp.com/me')
    .then((res) => {
      dispatch({
        type: ALERT_MESSAGE,
        payload: { alertMessage: 'One moment...', variant: 'warning' },
      });
      dispatch({ type: GET_USER_INFO, payload: res.data.id });
      dispatch({ type: LOADING_START });
    })
    .catch((err) => {
      console.log('Error occurred while retrieving profile information', err);
    });
};

// Step 4: Save Form Values in State

export const handleFormValues = (data) => (dispatch) => {
  return dispatch({ type: HANDLE_FORM_VALUES, payload: data });
};

// Step 5: Save Slider Values in State

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

// Step 6: Create a New Playlist

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
  return dispatch({ type: RANDOMIZE_QUERY, payload: result });
};

// Step 8: Retrieve offset

export const randomizeOffset = () => (dispatch) => {
  var result = '';
  result = Math.floor(Math.random() * 500 + 1);
  return dispatch({ type: RANDOMIZE_OFFSET, payload: result });
};

// Step 9: Search for songs

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
      console.log(res);
    })
    .catch((err) => {
      console.log('There was an error searching for tracks: ', err);
    });
};

// Step 10: Retrieve Track URIs from Search Results

export const handleTrackUris = () => (dispatch, getState) => {
  let state = getState();
  const searchResults = state.searchResults;
  let uriList = [...new Set(searchResults.map((song) => song.uri))];
  return dispatch({ type: GET_TRACK_URIS, payload: uriList });
};

// Step 11: Add Songs to playlist

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
    .then((res) => {
      dispatch({
        type: LOADING_FINISH,
      });
      dispatch({ type: SUCCESS_ALERT });
    })
    .catch((err) => {
      dispatch({
        type: ALERT_MESSAGE,
        payload: {
          alertMessage: `An error has occurred 😥. Please try again or widen your search criteria.`,
          variant: 'danger',
        },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('validated');
    });
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
export const redirect = () => (dispatch, getState) => {
  let state = getState();
  const authUri = state.authUri;
  return (window.location.href = authUri);
};
export const retrieveCodeFromURL = () => (dispatch) => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  dispatch({ type: ACCESS_CODE_SUCCESS, payload: code });
};

export const initialAuthorize = () => (dispatch) => {
  dispatch(handleAuthURI()).then(() => {
    return dispatch(redirect());
  });
};

export const getToken = () => (dispatch) => {
  dispatch(retrieveCodeFromURL()).then(() => {
    return dispatch(handleToken());
  });
};
