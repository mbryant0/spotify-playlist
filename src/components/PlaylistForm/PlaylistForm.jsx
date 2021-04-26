import React, { useState, useReducer } from 'react';
import CustomSlider from '../CustomSlider/CustomSlider';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { genres } from '../../assets/Genres';
import { connect } from 'react-redux';
import {
  handlePlaylistCreation,
  handleSearch,
  handleAuthURI,
  handleToken,
  handleUserInfo,
  randomizeQuery,
  handleTrackUris,
  addToPlaylist,
} from '../../redux/actions/actions';

const PlaylistForm = (props) => {
  const [sliderValue, setSliderValue] = useState([1970, 2000]);
  const [formValues, setFormValues] = useState({
    playlistName: '',
    description: '',
    public: false,
    genre: '',
    numSongs: '',
  });
  // const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    const { checked, value, name, type } = e.target;
    const updatedInfo = type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: updatedInfo });
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const {
    userId,
    token,
    query,
    playlistId,
    trackUris,
    authUri,
    searchResults,
  } = props;
  const handleRedirect = () => {
    window.location.href = authUri;
  };

  const generatePlaylists = (e) => {
    e.preventDefault();
    handleAuthURI();
    handleRedirect();
    handleToken();
    handleUserInfo();
    handlePlaylistCreation(userId, formValues, token);
    randomizeQuery();
    handleSearch(query, formValues, sliderValue, token);
    handleTrackUris(searchResults);
    addToPlaylist(playlistId, trackUris, token);
  };
  return (
    <>
      <Container className='homepage-container'>
        <Container className='title'>
          <h1>Spotify Playlist Generator 🎧</h1>
        </Container>
        <Container>
          <Form>
            <Form.Row>
              <Col xs={7}>
                <Form.Group>
                  <Form.Label>PLAYLIST NAME</Form.Label>
                  <Form.Control
                    size='lg'
                    type='text'
                    placeholder='"My Awesome New Playlist"'
                    name='playlistName'
                    value={formValues.playlistName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>NUMBER OF SONGS</Form.Label>
                  <Form.Control
                    name='numSongs'
                    value={formValues.numSongs}
                    onChange={handleChange}
                    type='number'
                    min={5}
                    max={100}
                    size='lg'
                  />
                </Form.Group>
              </Col>
              <Col xs={2}>
                <Form.Group>
                  <Form.Label>PLAYLIST PUBLIC? (Turn ON for Public)</Form.Label>
                  <Form.Check
                    name='public'
                    checked={formValues.public}
                    onChange={handleChange}
                    type='switch'
                    id='custom-switch'
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>PLAYLIST DESCRIPTION</Form.Label>
                  <Form.Control
                    name='description'
                    value={formValues.description}
                    onChange={handleChange}
                    rows={3}
                    as='textarea'
                    maxLength='250'
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Label>YEAR RANGE</Form.Label>
                <CustomSlider
                  valueLabelDisplay='auto'
                  min={1950}
                  max={2021}
                  name='year'
                  value={sliderValue}
                  onChange={handleSliderChange}
                  aria-labelledby='range-slider'
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>GENRE</Form.Label>
                  <Form.Control
                    name='genre'
                    value={formValues.genre}
                    onChange={handleChange}
                    as='select'
                  >
                    {genres.map((genre) => (
                      <option {...genre.attributes} value={genre.value}>
                        {genre.text}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Button onClick={generatePlaylists} type='submit'>
                    Generate Playlist
                  </Button>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    token: state.token,
    query: state.query,
    playlistId: state.playlistId,
    trackUris: state.trackUris,
    authUri: state.authUri,
    searchResults: state.searchResults,
  };
};

export default connect(mapStateToProps, {
  handleAuthURI,
  handlePlaylistCreation,
  randomizeQuery,
  handleSearch,
  handleToken,
  handleTrackUris,
  handleUserInfo,
  addToPlaylist,
})(PlaylistForm);
