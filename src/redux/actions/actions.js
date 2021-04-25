export const GET_URI = 'GET_URI';
export const HANDLE_TOKEN = 'HANDLE_TOKEN';

// Step 1: Begin Authorization

const handleURI = () => {
  axios
    .get('http://localhost:2019/authorize')
    .then((res) => {
      return { type: GET_URI, payload: res.data };
      //setUri(res.data);
      //console.log(uri);
    })
    .catch((err) => console.log('Error occurred', err));
};
// Step 2: Save Token
const handleRedirect = () => {
  window.location.href = uri;
};

// Step 3: Put Token in State
const handleToken = () => {
  axios.get('http://localhost:2019/token').then((res) => {
    return { type: HANDLE_TOKEN, payload: res.data };
    // console.log(res);
    //setToken(res.data);
  });
};

// Step 4: Save User Info in State

const handleUserInfo = () => {
  axios
    .get('http://localhost:2019/me')
    .then((res) => {
      setUserId(res.data.id);
      console.log(res.data.id);
    })
    .catch((err) =>
      console.log('Error occurred while retrieving profile information', err)
    );
};

// Step 5: Create a New Playlist
const handlePlaylistCreation = () => {
  axios
    .post(
      `https://api.spotify.com/v1/users/${props.userId}/playlists`,
      {
        name: formValues.playlistName,
        description: formValues.description,
        public: formValues.public.toString(),
      },
      { headers: { Authorization: 'Bearer' + ' ' + props.token } }
    )
    .then((res) => {
      setPlaylistId(res.data.id);
      console.log(res.data.id);
    })
    .catch((err) => console.log(err));
};

// Step 6: Get Query Seed

const randomizeQuery = () => {
  var result = '';
  result =
    randomCharacters[Math.floor(Math.random() * randomCharacters.length)];
  setQuery(result);
  console.log('Query: ', query);
};

// Step 7: Search for songs
const handleSearch = () => {
  axios
    .get(
      `https://api.spotify.com/v1/search?query=${query}*+genre%3A${props.formValues.genre}+year%3A+${props.sliderValue[0]}-${props.sliderValue[1]}&type=track&offset=0&limit=${props.formValues.numSongs}`,
      { headers: { Authorization: 'Bearer' + ' ' + props.token } }
    )
    .then((res) => {
      setSearchResults(res.data.tracks.items);
      console.log(searchResults);
    })
    .catch((err) => console.log('Error: ', err));
};
// Step 8: Get URIs
const handleUris = () => {
  let uriList = [...new Set(searchResults.map((song) => song.uri))];
  setUris(uriList);
};
// Step 9: Add Songs to playlist

const addToPlaylist = () => {
  console.log('URIs: ', props.uris);
  console.log('Playlist Id: ', props.playlistId);
  console.log('Token: ', props.token);
  axios
    .post(
      `https://api.spotify.com/v1/playlists/${props.playlistId}/tracks`,
      { uris: props.uris },
      { headers: { Authorization: 'Bearer' + ' ' + props.token } }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
