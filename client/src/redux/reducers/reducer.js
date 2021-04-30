import {
  GET_URI,
  HANDLE_TOKEN,
  GET_USER_INFO,
  CREATE_PLAYLIST,
  RANDOMIZE_QUERY,
  SEARCH_SONGS,
  GET_TRACK_URIS,
  HANDLE_FORM_VALUES,
  HANDLE_SLIDER_VALUE,
  RANDOMIZE_OFFSET,
  SUCCESS_ALERT,
  GET_PLAYLIST_URL,
} from '../actions/actions';

const initialState = {
  authUri: '',
  token: '',
  userId: '',
  playlistId: '',
  query: '',
  searchResults: [],
  trackUris: [],
  playlistName: '',
  description: '',
  privacy: false,
  genre: '',
  numSongs: '',
  finalSliderValue: [],
  offset: '',
  snapShotId: '',
  playlistUrl: '',
  success: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_URI:
      return { ...state, authUri: action.payload };
    case HANDLE_TOKEN:
      return { ...state, token: action.payload };
    case GET_USER_INFO:
      return { ...state, userId: action.payload };
    case HANDLE_FORM_VALUES:
      return {
        ...state,
        playlistName: action.payload.playlistName,
        description: action.payload.description,
        privacy: action.payload.privacy,
        genre: action.payload.genre,
        numSongs: action.payload.numSongs,
      };
    case HANDLE_SLIDER_VALUE:
      return { ...state, finalSliderValue: action.payload };
    case CREATE_PLAYLIST:
      return { ...state, playlistId: action.payload };
    case RANDOMIZE_QUERY:
      return { ...state, query: action.payload };
    case RANDOMIZE_OFFSET:
      return { ...state, offset: action.payload };
    case SEARCH_SONGS:
      return { ...state, searchResults: action.payload };
    case GET_TRACK_URIS:
      return { ...state, trackUris: action.payload };
    case GET_PLAYLIST_URL:
      return { ...state, playlistUrl: action.payload };
    case SUCCESS_ALERT:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}

export default reducer;
