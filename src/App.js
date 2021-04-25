import './App.scss';
import React from 'react';
import { createStore } from 'redux';
import PlaylistForm from './components/PlaylistForm/PlaylistForm';
import reducer from './redux/reducer';

function App() {
  return (
    <>
      <PlaylistForm userId={userId} token={token} />
    </>
  );
}

export default App;
