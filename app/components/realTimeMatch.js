import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';

class RealTimeMatch extends React.PureComponent {
  render() {
    return (
      <div>
        <Row>
          <Col xs={10} md={4}>
          quizzy.com/<input type='text' name='match_name' placeholder='match name'/>
          </Col>
          <Col xs={2} md={2}>
            <Button>SHARE</Button>
          </Col>
          <Col xs={0} md={4}></Col>
          <Col xs={12} md={2}>
            <Button>Customize</Button>
          </Col>
        </Row>
        <Row>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Playing Now...</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pepe</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Tito</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </div>
    )
  }
}

export default RealTimeMatch;
