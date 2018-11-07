import React from 'react';
import { Row, Col } from 'reactstrap';

const BucketDetails = () => {
  return (
    <div className="pt-4 pl-4">
      <Row>
        <Col xs="3" className="float-right">
          <p>Bucket name:</p>
        </Col>
        <Col xs="9">
          <p>My new Storage</p>
        </Col>
      </Row>
      <Row>
        <Col xs="3" className="float-right">
          <p>Location:</p>
        </Col>
        <Col xs="9">
          <p>Kranj</p>
        </Col>
      </Row>
      <Row>
        <Col xs="3" className="float-right">
          <p>Storage size:</p>
        </Col>
        <Col xs="9">
          <p>4.9GB</p>
        </Col>
      </Row>
    </div>
  );
};

export default BucketDetails;
