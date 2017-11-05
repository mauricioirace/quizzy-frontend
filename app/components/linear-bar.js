import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/linear-bar.scss';

class LinearBar extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='linear'>
        <div className='linear-bar' style={{ width: `${ this.props.percentage }%` }}/>
      </div>
    )
  }
}

LinearBar.propTypes = {
  percentage: PropTypes.number
}

export default LinearBar;
