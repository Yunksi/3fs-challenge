import React from 'react';
import { Row, Button, Col, Table } from 'reactstrap';

class BucketFiles extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  uploadObject() {
    this.fileInputRef.current.click();
  }

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
              <Button color="primary" className="float-right mr-1">
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
      </div>
    );
  }
}

export default BucketFiles;
