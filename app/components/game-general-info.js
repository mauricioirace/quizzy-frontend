import React from 'react';
import PropTypes from 'prop-types';
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

  getNameValidationState(name) {
    if (this.props.validateField) {
      if (this.props.gameData.name === '') {
        return 'error'
      }
    }
    return null
  }

  render() {
    const game = this.props.gameData;
    return (
      <Form>
        <FormGroup controlId='formName' validationState={ this.getNameValidationState() }>
          <ControlLabel>Name</ControlLabel>
          <FormControl type='text' value={ game.name } placeholder='90s music' onChange={ this.onChangeName }/>
          <span className='help-block'>{ this.props.nameMessage }</span>
        </FormGroup>

        <FormGroup controlId='formControlsTextarea'>
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass='textarea' value={ game.description } type='text' onChange={ this.onChangeDescription } placeholder="A game about grunge, jazz and rock n' roll"/>
        </FormGroup>

        <FormGroup controlId='imageasd'>
          <ControlLabel>Image</ControlLabel>
          <FormControl type='file' onChange={ this.onChangeImage }/>
        </FormGroup>

        <FormGroup controlId='formCategory'>
          <ControlLabel>Category</ControlLabel>
          <FormControl componentClass='select' value={ game.category } placeholder='select' onChange={ this.onChangeCategory }>
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

GameGeneralInfo.propTypes = {
  nameMessage: PropTypes.string,
  validateField: PropTypes.bool,
  gameData: PropTypes.object,
  changeCategory: PropTypes.func,
  changeName: PropTypes.func,
  changeDescription: PropTypes.func,
  changeImage: PropTypes.func,
}

export default GameGeneralInfo;
