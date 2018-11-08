import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import BucketDetails from './BucketDetails';
import BucketFiles from './BucketFiles';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

@withRouter
@inject('bucketStore')
@observer
export class Bucket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'files',
      files: []
    };
  }

  componentDidMount = () => {
    console.log(this.props.match.params.id);
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <h1 style={{ marginTop: '1em', marginBottom: '1em' }}>Bucket name</h1>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={this.state.activeTab === 'files' ? 'active' : ''}
              onClick={() => {
                this.toggle('files');
              }}
            >
              Files
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === 'details' ? 'active' : ''}
              onClick={() => {
                this.toggle('details');
              }}
            >
              Details
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="files" className="mt-3">
            <BucketFiles files={this.state.files} />
          </TabPane>
          <TabPane tabId="details">
            <BucketDetails />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Bucket;
