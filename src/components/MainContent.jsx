import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BucketList from './BucketList';
import BucketView from './BucketView';

const MainContent = () => {
  return (
    <Switch>
      <Route path="/" exact component={BucketList} />
      <Route path="/view" component={BucketView} />
    </Switch>
  );
};

export default MainContent;
