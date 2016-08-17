import React from 'react';
import { Route, IndexRoute } from 'react-router';

import IssuesBox from './components/IssuesBox';
import IssuePage from './components/IssuePage';
import App from './components/App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IssuesBox}/>
    <Route path="/:repoAuthor/:repoName/issues/:issueId" component={IssuePage}/>
  </Route>
)