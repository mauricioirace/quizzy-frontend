import React from 'react';
import { Button, Col, Row, Form, FormGroup, ControlLabel, FormControl, PageHeader, Well, InputGroup,
  Glyphicon, Panel,  Thumbnail, Grid, Carousel, PanelGroup } from 'react-bootstrap';


class GameGeneralInfo extends React.PureComponent {
  
  constructor(props){
    super(props);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
  }

  onChangeImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    this.props.changeImage(file, reader);
    // reader.readAsDataURL(file);
    // reader.onloadend = (e) => this.props.changeImage(reader.result);
  }

  onChangeDescription(event) {
    this.props.changeDescription(event.target.value);
  }

  onChangeName(event) {
    this.props.changeName(event.target.value);
  }

  onChangeCategory(event) {
    this.props.changeCategory(event.target.value);
  }

  render() {

    return (
      <Panel header='GENERAL INFO' eventKey='1'>
        <Form horizontal>

          <FormGroup controlId='formName'>
            <Col sm={ 1 }>
              <ControlLabel>Name</ControlLabel>
            </Col>
            <Col sm={ 8 }>
              <FormControl type='text' placeholder='90s music' onChange={ this.onChangeName }/>
            </Col>
          </FormGroup>

          <FormGroup controlId='formControlsTextarea'>
            <Col sm={ 1 }>
              <ControlLabel>Description</ControlLabel>
            </Col>
            <Col sm={ 8 }>
              <FormControl componentClass='textarea' type='text' onChange={ this.onChangeDescription } placeholder="A game about grunge, jazz and rock n' roll"/>
            </Col>
          </FormGroup>

          <FormGroup controlId='imageasd'>
            <Col sm={ 1 }>
              <ControlLabel>Image</ControlLabel>
            </Col>
            <Col sm={ 8 }>
              <FormControl type='file' onChange={ this.onChangeImage }/>
            </Col>
          </FormGroup>

          <FormGroup controlId='formCategory'>
            <Col sm={ 1 }>
              <ControlLabel>Category</ControlLabel>
            </Col>
            <Col sm={ 8 }>
              <FormControl componentClass='select' placeholder='select' onChange={ this.onChangeCategory }>
                <option value='music'>Music</option>
                <option value='sports'>Sports</option>
                <option value='videogames'>Videogames</option>
                <option value='history'>History</option>
                <option value='other'>Other</option>
              </FormControl>
            </Col>
          </FormGroup>

        </Form>
      </Panel>
    );
  }
}

export default GameGeneralInfo;
