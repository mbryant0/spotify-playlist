import React, { useState, useEffect } from 'react';
import CustomSlider from '../CustomSlider/CustomSlider';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { genres } from '../../assets/Genres';
import { connect } from 'react-redux';
import {
  generatePlaylists,
  initialAuthorize,
  handleToken,
  retrieveCodeFromURL,
  getToken,
} from '../../redux/actions/actions';
import * as yup from 'yup';

const PlaylistForm = (props) => {
  const {
    generatePlaylists,
    playlistUrl,
    success,
    active,
    alertMessage,
    variant,
    initialAuthorize,
    handleToken,
    retrieveCodeFromURL,
  } = props;

  // Setting Initial State Values

  const [sliderValue, setSliderValue] = useState([1970, 2000]);
  const [formValues, setFormValues] = useState({
    playlistName: '',
    description: '',
    privacy: false,
    genre: '',
    numSongs: '',
  });

  // Setting Form Authentication Requirements

  const schema = yup.object().shape({
    playlistName: yup.string().required('Playlist name is required.'),
    description: yup.string(),
    privacy: yup.boolean(),
    genre: yup.string().required('Genre is required'),
    numSongs: yup.string().required('Number of songs is required.'),
  });

  // Setting Error Messages Depending if User Input Matches Schema

  const [errorMessages, setErrorMessages] = useState({
    playlistName: '',
    genre: '',
    numSongs: '',
  });

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setErrorMessages({ ...errorMessages, [name]: '' });
      })
      .catch((err) => {
        setErrorMessages({ ...errorMessages, [name]: 'Error' });
      });
  };

  // Updating State W/ User Input

  const handleChange = (e) => {
    const { checked, value, name, type } = e.target;
    const updatedInfo = type === 'checkbox' ? checked : value;
    setFormErrors(name, updatedInfo);
    setFormValues({ ...formValues, [name]: updatedInfo });
  };
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePlaylists({ formValues: formValues, sliderValue: sliderValue });
  };

  // Disabling Submit Button Unless It Matches Form Authentication Schema

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  const handleInitialAuthorize = (e) => {
    e.preventDefault();
    initialAuthorize();
  };
  useEffect(() => {
    //retrieveCodeFromURL()
    //  handleToken();
    getToken();
  }, []);

  return (
    <>
      <Container className='homepage-container'>
        <Container className='title'>
          <h1>Spotify Playlist Generator 🎧</h1>
        </Container>
        {!localStorage.getItem('validated') && (
          <Container className='disclaimer'>
            <h2>
              In order to use this application, you must authorize your Spotify
              account.
            </h2>
            <button onClick={handleInitialAuthorize}>
              I agree, authorize my account
            </button>
          </Container>
        )}
        {localStorage.getItem('validated') && (
          <Container>
            <Form onSubmit={handleSubmit}>
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
                      max={50}
                      size='lg'
                    />
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Form.Group>
                    <Form.Label>
                      PLAYLIST PUBLIC? (Turn ON for Public)
                    </Form.Label>
                    <Form.Check
                      name='privacy'
                      checked={formValues.privacy}
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
                    <Button disabled={disabled} type='submit'>
                      Generate Playlist
                    </Button>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  {active && <Alert variant={variant}>{alertMessage}</Alert>}

                  <Alert
                    variant='success'
                    style={{ visibility: success ? 'visible' : 'hidden' }}
                  >
                    Your playlist has successfully been created. You may view it{' '}
                    <Alert.Link href={playlistUrl}>here</Alert.Link>.
                  </Alert>
                </Col>
              </Form.Row>
            </Form>
          </Container>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authUri: state.authUri,
    query: state.query,
    success: state.success,
    playlistUrl: state.playlistUrl,
    active: state.active,
    playlistName: state.playlistName,
    alertMessage: state.alertMessage,
    variant: state.variant,
    token: state.token,
  };
};

export default connect(mapStateToProps, {
  generatePlaylists,
  initialAuthorize,
  handleToken,
  retrieveCodeFromURL,
  getToken,
})(PlaylistForm);
