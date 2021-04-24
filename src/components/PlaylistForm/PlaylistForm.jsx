import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const PlaylistForm = () => {
  const [value, setValue] = useState([1950, 2021]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const useStyles = makeStyles({
    root: {
      width: `100%`,
    },
  });

  const classes = useStyles();

  const valuetext = () => {
    return `${value}`;
  };
  return (
    <Container>
      <Form>
        <Form.Row>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control size='lg' type='text' />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Number of Songs</Form.Label>
              <Form.Control type='number' min={5} max={100} size='lg' />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Playlist Privacy? (Turn ON for Private)</Form.Label>
              <Form.Check type='switch' id='custom-switch' />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Playlist Description</Form.Label>
              <Form.Control rows={3} as='textarea' maxLength='250' />
            </Form.Group>
          </Col>
        </Form.Row>
        <div className={classes.root}>
          <Form.Label>Year Range</Form.Label>
          <Slider
            min={1950}
            max={2021}
            value={value}
            onChange={handleChange}
            valueLabelDisplay='auto'
            aria-labelledby='range-slider'
            getAriaValueText={valuetext}
          />
        </div>
        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Control as='select'>
            <option>Select a genre...</option>
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
      </Form>
    </Container>
  );
};

export default PlaylistForm;
