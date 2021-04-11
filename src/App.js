import './App.css';
import axios from 'axios';
import React from 'react';

function App() {
  // dummy data to test POST request
  const playlist = {
    playlistname: 'Test title',
    playlistprivacy: false,
    description: 'Test description',
    numtracks: 20,
    lowtempo: 90,
    hightempo: 150,
    lowyear: 2010,
    highyear: 2020,
    userid: 'TBT',
  };

  const clientId = 'b11d8ab198794afa9a89737020c39376';
  const secret = 'ef62c88a0e31415db8b62b6060ed6b3e';
  const redirectUri = 'http%3A//localhost%3A3000/';
  const handleData = () => {
    axios
      .get(`https://accounts.spotify.com/authorize`)
      .then((res) => {
        console.log('Your authorization code: ', res);
      })
      .catch((err) => console.log('There is an error', err));
  };
  return (
    <>
      <h1>Testing out authorization</h1>
      <button onClick={handleData}>Click to check data</button>
    </>
  );
}

export default App;
