import React from 'react';
import axios from 'axios';

const AddSongs = (props) => {
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
  return (
    <>
      <button onClick={addToPlaylist}>Add Songs to Playlist!</button>
    </>
  );
};

export default AddSongs;
