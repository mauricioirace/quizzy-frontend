import React from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';

class NormalMatch extends React.PureComponent {
  render() {
    return (
      <div>
        <Row>
          <Col xs={0} md={4}></Col>
          <Col xs={12} md={2}>
            <Button>Customize</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NormalMatch;
