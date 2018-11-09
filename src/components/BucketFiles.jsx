import React from 'react';
import {
  Row,
  Button,
  Col,
  Table,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

@withRouter
@inject('bucketStore')
@observer
class BucketFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.fileInputRef = React.createRef();
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount = () => {
    this.props.bucketStore.getBucketFiles(this.props.match.params.id);
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  uploadObject() {
    this.fileInputRef.current.click();
  }

  openModalConfirmationDialog() {}

  renderBucketFiles(files) {
    return files.map(file => {
      return (
        <tr>
          <td>{file.name}</td>
          <td>{file.last_modified}</td>
          <td>{file.size}</td>
        </tr>
      );
    });
  }

  getFile = e => {
    this.props.bucketStore.addFileToBucket(
      e.target.files[0],
      this.props.match.params.id
    );
  };

  render() {
    const { totalBucketFilesCount, bucketFiles } = this.props.bucketStore;
    return (
      <div>
        <input
          type="file"
          ref={this.fileInputRef}
          id="object"
          style={{ display: 'none' }}
          onChange={this.getFile}
        />
        <Row>
          <Col xs="6">
            <p>All files ({totalBucketFilesCount})</p>
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
              <tbody>{this.renderBucketFiles(bucketFiles)}</tbody>
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
