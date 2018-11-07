import React, { Component } from 'react';
import { Form, Col, Label, FormGroup, Input, Button, Row } from 'reactstrap';
import axios from 'axios';

const apiKey = process.env.SECURE_CLOUD_STORAGE_API_KEY;

export class CreateBucket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      bucketName: '',
      bucketLocationId: null
    };

    this.handleBucketNameChange.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://challenge.3fs.si/storage/locations', {
        headers: {
          Authorization: `Token ${apiKey}`
        }
      })
      .then(res => {
        this.setState({
          locations: res.data.locations
        });
      });
  }

  handleBucketNameChange(e) {
    this.setState({
      bucketName: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted', event);
  }

  renderLocations() {
    return (
      <Input type="select" name="location" id="selectLocation">
        {this.state.locations.map(location => {
          return (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          );
        })}
      </Input>
    );
  }

  handleLocationChange(e) {
    this.setState({
      bucketLocationId: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h4>Create new bucket</h4>
        <Form onSubmit={e => this.handleSubmit(e)} className="form">
          <Row>
            <Col xs="6">
              <FormGroup>
                <Label for="bucketName">Bucket name*</Label>
                <Input
                  type="text"
                  name="bucket"
                  id="bucketName"
                  required
                  placeholder="Enter bucket name"
                  onChange={e => this.handleBucketNameChange(e)}
                />
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label for="selectLocation">Bucket Location*</Label>
                {this.renderLocations()}
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary">Create Bucket</Button>
        </Form>
      </div>
    );
  }
}

export default CreateBucket;
