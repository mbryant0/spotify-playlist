import React, { useState } from 'react';
import CustomSlider from '../CustomSlider/CustomSlider';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { genres } from '../../assets/Genres';

const PlaylistForm = () => {
  const [value, setValue] = useState([1950, 2021]);
  /*
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
*/
  const valuetext = () => {
    return `${value}`;
  };

  return (
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
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>NUMBER OF SONGS</Form.Label>
                <Form.Control type='number' min={5} max={100} size='lg' />
              </Form.Group>
            </Col>
            <Col xs={2}>
              <Form.Group>
                <Form.Label>PLAYLIST PRIVACY? (Turn ON for Private)</Form.Label>
                <Form.Check type='switch' id='custom-switch' />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>PLAYLIST DESCRIPTION</Form.Label>
                <Form.Control rows={3} as='textarea' maxLength='250' />
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
                defaultValue={[1970, 2000]}
                aria-labelledby='range-slider'
                getAriaValueText={valuetext}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>GENRE</Form.Label>
                <Form.Control as='select'>
                  {genres.map((genre) => (
                    <option {...genre.attributes} {...genre.selected}>
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
                <Button type='submit'>Generate Playlist</Button>
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    </Container>
  );
};

export default PlaylistForm;
