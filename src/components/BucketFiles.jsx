import React from 'react';
import {
  Row,
  Button,
  Col,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

class BucketFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.fileInputRef = React.createRef();
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  uploadObject() {
    this.fileInputRef.current.click();
  }

  openModalConfirmationDialog() {}

  render() {
    return (
      <div>
        <input
          type="file"
          ref={this.fileInputRef}
          id="object"
          style={{ display: 'none' }}
        />
        <Row>
          <Col xs="6">
            <p>All files ({this.props.files.length})</p>
          </Col>
          <Col xs="6">
            <div className="float-right">
              <Button
                color="primary"
                className="float-right"
                onClick={() => this.uploadObject()}
              >
                Upload object
              </Button>
              <Button
                color="primary"
                className="float-right mr-1"
                onClick={this.toggle}
              >
                Delete object
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Table dark bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Last modified</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Filename 001</td>
                  <td>06.09.2015</td>
                  <td>2MB</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
          <ModalBody>Do you really want to delete this object?</ModalBody>
          <ModalFooter className="float-left">
            <Button color="danger" onClick={this.toggle}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default BucketFiles;
