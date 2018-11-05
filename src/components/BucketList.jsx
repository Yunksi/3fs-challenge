import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'reactstrap';
import axios from 'axios';

export default class BucketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      buckets: []
    };
  }

  componentDidMount() {
    axios
      .get('https://challenge.3fs.si/storage/buckets', {
        headers: {
          Authorization: `Token ${apiKey}`
        }
      })
      .then(res => {
        this.setState({
          loading: !this.state.loading,
          buckets: res.data.buckets
        });
      });
  }

  renderBuckets() {
    return this.state.buckets.map(bucket => {
      <tr>
        <td>{bucket.name}</td>
        <td>{bucket.location.name}</td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h1>Bucket list</h1>
          </Col>
        </Row>
        {this.state.loading ? (
          <h2>Loading data...</h2>
        ) : (
          <Row>
            <Col xs="6">
              <p>All buckets ({this.state.buckets.length})</p>
            </Col>
            <Col xs="6">
              <Button color="primary" className="float-right">
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
                <tbody>{this.renderBuckets()}</tbody>
              </Table>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
