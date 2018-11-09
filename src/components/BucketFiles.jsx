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
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import filesize from 'filesize';

@withRouter
@inject('bucketStore')
@observer
class BucketFiles extends React.Component {
  constructor(props) {
    super(props);

    this.fileInputRef = React.createRef();
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount = () => {
    this.props.bucketStore.getBucketFiles(this.props.match.params.id);
  };

  toggle(objectName) {
    this.props.bucketStore.openCloseDeleteObjectModal(objectName);
  }

  uploadObject() {
    this.fileInputRef.current.click();
  }

  renderBucketFiles(files) {
    return files.map(file => {
      return (
        <tr key={file.name}>
          <td>
            <FontAwesomeIcon
              icon={faFileAlt}
              style={{ marginRight: '0.75em', fontSize: '1.5em' }}
            />
            {file.name}
          </td>
          <td>
            <Moment format="DD.MM.YYYY" date={file.last_modified} />
          </td>
          <td>{filesize(file.size)}</td>
          <td>
            <Button
              color="danger"
              className="float-right mr-1"
              onClick={() => this.toggle(file.name)}
            >
              <FontAwesomeIcon icon="times" />
            </Button>
          </td>
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

  deleteObject = () => {
    this.props.bucketStore.deleteObjectFromBucket(this.props.match.params.id);
  };

  render() {
    const {
      totalBucketFilesCount,
      bucketFiles,
      isDeleteObjectModalOpened
    } = this.props.bucketStore;
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
                Upload objects
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
                  <th />
                </tr>
              </thead>
              <tbody>{this.renderBucketFiles(bucketFiles)}</tbody>
            </Table>
          </Col>
        </Row>
        <Modal isOpen={isDeleteObjectModalOpened} toggle={this.toggle} centered>
          <ModalBody>Do you really want to delete this object?</ModalBody>
          <ModalFooter className="float-left">
            <Button color="danger" onClick={this.deleteObject}>
              Delete
            </Button>
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
