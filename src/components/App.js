import React, { Component } from 'react';
import IssuesBox from './IssuesBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children || <IssuesBox/>}
      </div>
    );
  }
}

export default App;
