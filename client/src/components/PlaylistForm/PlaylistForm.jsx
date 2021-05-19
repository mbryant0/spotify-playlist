import React, { useState, useEffect } from 'react';
import CustomSlider from '../CustomSlider/CustomSlider';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { genres } from '../../assets/Genres';
import { schema } from '../../assets/playlistSchema';
import { connect } from 'react-redux';
import {
  generatePlaylists,
  handleToken,
  retrieveCodeFromURL,
  getToken,
  handleInitialAuthorize,
} from '../../redux/actions/actions';

import { useForm } from 'react-hook-form';
import useYupValidation from '../../hooks/useYupValidation';
import useSlider from '../../hooks/useSlider';

const PlaylistForm = (props) => {
  const {
    generatePlaylists,
    playlistUrl,
    success,
    active,
    alertMessage,
    variant,
    handleInitialAuthorize,
    handleToken,
    retrieveCodeFromURL,
  } = props;

  const resolver = useYupValidation(schema);
  const { register, handleSubmit, errors, formState } = useForm({
    resolver: resolver,
    mode: 'onChange',
  });
  const { value: sliderValue, bind: bindSliderValues } = useSlider([
    1970, 2000,
  ]);

  useEffect(() => {
    retrieveCodeFromURL();
    handleToken();
  }, []);

  const onSubmit = (data) => {
    generatePlaylists({ formValues: data, sliderValue: sliderValue });
  };

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
          <Container style={{ flex: 'no-wrap' }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Row className='desktop'>
                <Col>
                  <Form.Group>
                    <Form.Label>PLAYLIST NAME</Form.Label>
                    <Form.Control
                      size='lg'
                      type='text'
                      placeholder='"My Awesome New Playlist"'
                      {...register('playlistName', { required: true })}
                      autoComplete='off'
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col xs={5}>
                  <Form.Group>
                    <Form.Label>NUMBER OF SONGS</Form.Label>
                    <Form.Control
                      {...register('numSongs', { required: true })}
                      type='number'
                      min={5}
                      max={50}
                      size='lg'
                      autoComplete='off'
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>PRIVATE/PUBLIC</Form.Label>
                    <Form.Check
                      {...register('privacy', { required: true })}
                      type='switch'
                      id='custom-switch'
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>DESCRIPTION</Form.Label>
                    <Form.Control
                      {...register('description', { required: true })}
                      rows={3}
                      as='textarea'
                      maxLength='250'
                      autoComplete='off'
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
                    {...bindSliderValues}
                    aria-labelledby='range-slider'
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>GENRE</Form.Label>
                    <Form.Control {...register('genre')} as='select'>
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
                    <Button disabled={!formState.isValid} type='submit'>
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
  handleInitialAuthorize,
  handleToken,
  retrieveCodeFromURL,
  getToken,
})(PlaylistForm);
