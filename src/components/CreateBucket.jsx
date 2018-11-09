import React, { Component } from 'react';
import { Form, Col, Label, FormGroup, Input, Button, Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';

@inject('bucketStore')
@observer
export class CreateBucket extends Component {
  constructor(props) {
    super(props);
    // this.handleBucketNameChange.bind(this);
  }

  componentDidMount() {
    this.props.bucketStore.getLocations();
  }

  handleBucketNameChange = e => {
    this.props.bucketStore.newBucket.name = e.target.value;
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.bucketStore.addBucket();
  }

  renderLocations(locations) {
    return (
      <Input
        type="select"
        name="location"
        id="selectLocation"
        required
        defaultValue=""
        onChange={this.handleLocationChange}
      >
        <option value="" disabled>
          Select Type
        </option>
        {locations.map(location => {
          return (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          );
        })}
      </Input>
    );
  }

  handleLocationChange = e => {
    this.props.bucketStore.newBucket.location = e.target.value;
  };

  render() {
    const { locations } = this.props.bucketStore;
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
                  onChange={this.handleBucketNameChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label for="selectLocation">Bucket Location*</Label>
                {this.renderLocations(locations)}
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
