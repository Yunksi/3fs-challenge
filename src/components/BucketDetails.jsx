import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { inject, observer } from 'mobx-react';

@inject('bucketStore')
@observer
class BucketDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { bucket } = this.props;
    const { selectedBucketTotalSize } = this.props.bucketStore;
    return (
      <div className="pt-4 pl-4">
        <Row>
          <Col xs="3" className="float-right">
            <p>Bucket name:</p>
          </Col>
          <Col xs="9">
            <p>{bucket.name}</p>
          </Col>
        </Row>
        <Row>
          <Col xs="3" className="float-right">
            <p>Location:</p>
          </Col>
          <Col xs="9">
            <p>{bucket.location.name}</p>
          </Col>
        </Row>
        <Row>
          <Col xs="3" className="float-right">
            <p>Storage size:</p>
          </Col>
          <Col xs="9">
            <p>{selectedBucketTotalSize}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BucketDetails;
