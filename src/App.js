import './App.scss';
import axios from 'axios';
import React, { useState } from 'react';
import SearchSongs from './components/SearchSongs/SearchSongs';
import PlaylistForm from './components/PlaylistForm/PlaylistForm';

function App() {
  const [uri, setUri] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  // dummy data to test POST request
  const playlistCreation = {
    name: '2001 IDM',
    description: 'Let us test out different genres',
    public: 'false',
  };

  // prints out URI for user to follow link to
  const handleURI = () => {
    axios
      .get('http://localhost:2019/authorize')
      .then((res) => {
        setUri(res.data);
        console.log(uri);
      })
      .catch((err) => console.log('Error occurred', err));
  };

  const handleRedirect = () => {
    window.location.href = uri;
  };

  const handleToken = () => {
    axios.get('http://localhost:2019/token').then((res) => {
      console.log(res);
      setToken(res.data);
    });
  };
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

  const handlePlaylistCreation = () => {
    axios
      .post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        playlistCreation,
        { headers: { Authorization: 'Bearer' + ' ' + token } }
      )
      .then((res) => {
        setPlaylistId(res.data.id);
        console.log(res.data.id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PlaylistForm />
      <button onClick={handleURI}>Click to begin authorization</button>
      <button onClick={handleRedirect}>Click to save token</button>
      <button onClick={handleToken}>Click to put token in state</button>
      <button onClick={handleUserInfo}>Click to save user info in state</button>
      <button onClick={handlePlaylistCreation}>
        Click to create a New Playlist!
      </button>
      <SearchSongs playlistId={playlistId} token={token} />
    </>
  );
}

export default App;
