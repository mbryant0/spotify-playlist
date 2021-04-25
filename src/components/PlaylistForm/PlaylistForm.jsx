import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const PlaylistForm = () => {
  const [value, setValue] = useState([1950, 2021]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));
  const CustomSlider = withStyles({
    root: {
      color: '#52af77',
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const valuetext = () => {
    return `${value}`;
  };
  const classes = useStyles();
  return (
    <Container className='homepage-container'>
      <Container>
        <h1>Spotify Playlist Generator 🎧</h1>
      </Container>
      <Container>
        <Form>
          <Form.Row>
            <Col xs={5}>
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
            <Col>
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
              <div className={classes.margin} />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>GENRE</Form.Label>
                <Form.Control as='select'>
                  <option selected disabled>
                    Select a genre...
                  </option>
                  <option>Pop</option>
                  <option>Britpop</option>
                  <option>Indie pop</option>
                  <option>Synth pop</option>
                  <option>K-Pop</option>
                  <option>J-Pop</option>
                  <option>Hip Hop</option>
                  <option>Rap</option>
                  <option>Underground Hip Hop</option>
                  <option>Instrumental Hip Hop</option>
                  <option>Trap</option>
                  <option>Hardcore Hip Hop</option>
                  <option>Grime</option>
                  <option>R{'&'}B</option>
                  <option>Soul</option>
                  <option>Funk</option>
                  <option>Electronic</option>
                  <option>House</option>
                  <option>Downtempo</option>
                  <option>Techno</option>
                  <option>Dubstep</option>
                  <option>EDM</option>
                  <option>IDM</option>
                  <option>Chiptune</option>
                  <option>Chillwave</option>
                  <option>Hyperpop</option>
                  <option>Juke</option>
                  <option>Vaporwave</option>
                  <option>Synthwave</option>
                  <option>Experimental</option>
                  <option>Ambient</option>
                  <option>Alternative</option>
                  <option>Indie Rock</option>
                  <option>Shoegaze</option>
                  <option>Grunge</option>
                  <option>Dream pop</option>
                  <option>Jazz</option>
                  <option>Fusion</option>
                  <option>Swing</option>
                  <option>Punk</option>
                  <option>Emo</option>
                  <option>Rock</option>
                  <option>Progressive Rock</option>
                  <option>Psychedelic Rock</option>
                  <option>Hard Rock</option>
                  <option>Garage Rock</option>
                  <option>Surf Rock</option>
                  <option>Math Rock</option>
                  <option>Rockabilly</option>
                  <option>Metal</option>
                  <option>Folk</option>
                  <option>Indie Folk</option>
                  <option>Country</option>
                  <option>Acoustic</option>
                  <option>Soundtrack</option>
                  <option>Classical</option>
                  <option>Kids</option>
                  <option>Devotional</option>
                  <option>Gospel</option>
                  <option>Latin</option>
                  <option>Brazilian</option>
                  <option>Cumbia</option>
                  <option>Tango</option>
                  <option>Latin Rock</option>
                  <option>Flamenco</option>
                  <option>Salsa</option>
                  <option>Reggaeton</option>
                  <option>Bachata</option>
                  <option>African</option>
                  <option>Tropical</option>
                  <option>Celtic</option>
                  <option>Balkan</option>
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
