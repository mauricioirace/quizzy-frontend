import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

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
      <Form>
        <FormGroup controlId='formName'>
            <ControlLabel>Name</ControlLabel>
            <FormControl type='text' placeholder='90s music' onChange={ this.onChangeName }/>
        </FormGroup>

        <FormGroup controlId='formControlsTextarea'>
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass='textarea' type='text' onChange={ this.onChangeDescription } placeholder="A game about grunge, jazz and rock n' roll"/>
        </FormGroup>

        <FormGroup controlId='imageasd'>
            <ControlLabel>Image</ControlLabel>
            <FormControl type='file' onChange={ this.onChangeImage }/>
        </FormGroup>

        <FormGroup controlId='formCategory'>
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass='select' placeholder='select' onChange={ this.onChangeCategory }>
              <option value='music'>Music</option>
              <option value='sports'>Sports</option>
              <option value='videogames'>Videogames</option>
              <option value='history'>History</option>
              <option value='other'>Other</option>
            </FormControl>
        </FormGroup>
      </Form>
    );
  }
}

export default GameGeneralInfo;
