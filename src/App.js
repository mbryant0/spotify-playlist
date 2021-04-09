import './App.css';
import axios from 'axios';

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

  const handleClick = () => {
    axios
      .post('http://localhost:2019/playlists/playlist', playlist)
      .then((res) => console.log('Success!', res))
      .catch((err) => console.log('Error occurred', err));
  };

  const handleData = () => {
    axios
      .get('http://localhost:2019/playlists/playlist')
      .then((res) => console.log('Playlists: ', res))
      .catch((err) => console.log('There is an error', err));
  };
  return (
    <>
      <h1>Testing out authorization</h1>
      <button onClick={handleClick}>Click to authorize</button>
      <button onClick={handleData}>Click to check data</button>
    </>
  );
}

export default App;
