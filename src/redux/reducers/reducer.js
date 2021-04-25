const initialState = {
  authUri: '',
  token: '',
  userId: '',
  playlistId: '',
  query: '',
  searchResults: [],
  trackUris: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_URI':
      return { uri: action.payload };
    case 'HANDLE_TOKEN':
      return { token: action.payload };
    case 'GET_USER_INFO':
      return { userId: action.payload };
    case 'CREATE_PLAYLIST':
      return { playlistId: action.payload };
    case 'RANDOMIZE_QUERY':
      return { query: action.payload };
    case 'SEARCH_SONGS':
      return { searchResults: action.payload };
    case 'GET_TRACK_URIS':
      return { trackUris: action.payload };
    default:
      return state;
  }
};

export default { reducer };
