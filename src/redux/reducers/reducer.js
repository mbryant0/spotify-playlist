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
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_URI':
      return { ...state, authUri: action.payload };
    case 'HANDLE_TOKEN':
      return { ...state, token: action.payload };
    case 'GET_USER_INFO':
      return { ...state, userId: action.payload };
    case 'HANDLE_FORM_VALUES':
      return {
        ...state,
        playlistName: action.payload.playlistName,
        description: action.payload.description,
        privacy: action.payload.privacy,
        genre: action.payload.genre,
        numSongs: action.payload.numSongs,
      };
    case 'CREATE_PLAYLIST':
      return { ...state, playlistId: action.payload };
    case 'RANDOMIZE_QUERY':
      return { ...state, query: action.payload };
    case 'SEARCH_SONGS':
      return { ...state, searchResults: action.payload };
    case 'GET_TRACK_URIS':
      return { ...state, trackUris: action.payload };
    default:
      return state;
  }
}

export default reducer;
