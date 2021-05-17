import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';

const MobilePlaylistForm = () => {
  const [formValues, setFormValues] = useState({
    playlistName: '',
    description: '',
    privacy: false,
    genre: '',
    numSongs: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    playlistName: '',
    genre: '',
    numSongs: '',
  });

  const handleChange = (e) => {
    const { checked, value, name, type } = e.target;
    const updatedInfo = type === 'checkbox' ? checked : value;
    setFormErrors(name, updatedInfo);
    setFormValues({ ...formValues, [name]: updatedInfo });
  };
  const schema = yup.object().shape({
    playlistName: yup.string().required('Playlist name is required.'),
    description: yup.string(),
    privacy: yup.boolean(),
    genre: yup.string().required('Genre is required'),
    numSongs: yup.string().required('Number of songs is required.'),
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

  return (
    <>
      <Form.Row className='mobile'>
        <Col>
          <Form.Group>
            <Form.Label>PLAYLIST NAME</Form.Label>
            <Form.Control
              size='lg'
              type='text'
              placeholder='"My Awesome New Playlist"'
              name='playlistName'
              value={formValues.playlistName}
              onChange={handleChange}
              autoComplete='off'
            />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className='mobile'>
        <Col xs={5}>
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
              autoComplete='off'
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>PLAYLIST PUBLIC? (Turn ON for Public)</Form.Label>
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
    </>
  );
};

export default MobilePlaylistForm;
