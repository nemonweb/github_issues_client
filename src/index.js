import React from 'react';
import ReactDOM from 'react-dom';
import IssuesBox from './IssuesBox';
import IssuePage from './IssuePage';
import App from './App';
import './index.css';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IssuesBox}/>
      <Route path="/:repoAuthor/:repoName/issues/:issueId" component={IssuePage}/>
    </Route>
  </Router>
  ,
  document.getElementById('root')
);
