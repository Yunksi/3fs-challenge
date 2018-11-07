import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BucketList from './BucketList';
import Bucket from './Bucket';

const MainContent = () => {
  return (
    <Switch>
      <Route path="/" exact component={BucketList} />
      <Route path="/view" component={Bucket} />
    </Switch>
  );
};

export default MainContent;
