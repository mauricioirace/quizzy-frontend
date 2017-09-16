import React from 'react';
import { connect } from 'react-redux';


class emptyFieldError extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let content = this.props.subject + 'field cannot be empty!';
    if (this.props.show ){
      return(
        <div>
          {content}
        </div>
      );
    }else return null;
  }
}

export default emptyFieldError;
