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
        <Row>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Position</th>
                <th>Nickname</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Pepe</td>
                <td>500</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Tito</td>
                <td>245</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </div>
    )
  }
}

export default NormalMatch;
