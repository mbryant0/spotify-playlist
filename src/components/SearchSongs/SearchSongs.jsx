import axios from 'axios';
import React, { useState } from 'react';

const SearchSongs = (props) => {
  const randomCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ];
  const [query, setQuery] = useState('');
  const [params, setParams] = useState({
    year: '1988',
    genre: 'rap',
    numSongs: '5',
  });
  const randomizeQuery = () => {
    var result = '';
    result =
      randomCharacters[Math.floor(Math.random() * randomCharacters.length)];
    setQuery(result);
    console.log('Query: ', query);
  };

  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = () => {
    axios
      .get(
        `https://api.spotify.com/v1/search?query=${query}*+genre%3A${params.genre}+year%3A+${params.year}&type=track&offset=0&limit=${params.numSongs}`,
        { headers: { Authorization: 'Bearer' + ' ' + props.token } }
      )
      .then((res) => {
        setSearchResults(res.data.tracks.items);
        console.log(searchResults);
      })
      .catch((err) => console.log('Error: ', err));
  };

  return (
    <>
      <button onClick={randomizeQuery}>Get query seed</button>
      <button onClick={handleSearch}>Search for songs</button>
    </>
  );
};

export default SearchSongs;
