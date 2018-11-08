import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import CreateBucket from './CreateBucket';
import './BucketList.css';

@inject('bucketStore')
@observer
class BucketList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.bucketStore.fetchBucketList();
  }

  openBucketAddForm() {
    this.props.bucketStore.addNewBucketFormOpen();
  }

  renderBuckets(buckets) {
    return buckets.map(bucket => {
      return (
        <tr key={bucket.id}>
          <td>
            <Link to={{ pathname: `/bucket/${bucket.id}` }}>{bucket.name}</Link>
          </td>
          <td>{bucket.location.name}</td>
        </tr>
      );
    });
  }

  render() {
    const {
      loadingBuckets,
      buckets,
      isCreateNewBucket,
      totalBucketCount
    } = this.props.bucketStore;
    return (
      <div>
        <Row>
          <Col>
            <h1>Bucket list</h1>
          </Col>
        </Row>
        {isCreateNewBucket ? (
          <Row className="whiteBackground">
            <Col>
              <CreateBucket />
            </Col>
          </Row>
        ) : (
          ''
        )}
        {loadingBuckets ? (
          <h1>Loading data...</h1>
        ) : (
          <Row className="whiteBackground">
            <Col xs="6">
              <p>All buckets ({totalBucketCount})</p>
            </Col>
            <Col xs="6">
              <Button
                color="primary"
                className="float-right"
                onClick={() => {
                  this.openBucketAddForm();
                }}
              >
                Create new bucket
              </Button>
            </Col>
            <Col xs="12">
              <Table dark bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>{this.renderBuckets(buckets)}</tbody>
              </Table>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default BucketList;
