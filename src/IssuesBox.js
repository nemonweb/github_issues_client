import React, { Component } from 'react';
import IssuesList from './IssuesList';
import RepositoryForm from './RepositoryForm';
import RepositoryName from './RepositoryName';
import './index.css';

class IssuesBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: []
    }
  };

  handleRepositorySubmit = repository => {
    let httpRequest2 = new XMLHttpRequest();
    httpRequest2.onreadystatechange = () => {
      if (httpRequest2.readyState === 4) {
        if (httpRequest2.status === 200) {
          const response = JSON.parse(httpRequest2.responseText);
          this.setState({ open_issues_count: response.open_issues_count });
        } else {
          console.error(this.props.url, httpRequest2.status, httpRequest2.responseText);
        }
      }
    };

    const url2 = `https://api.github.com/repos/${repository.author}/${repository.repository}`
    httpRequest2.open('GET', url2, true);
    httpRequest2.send();


    // get issues
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          const response = JSON.parse(httpRequest.responseText);
          this.setState({ data: response, author: repository.author, repository: repository.repository });
        } else {
          console.error(this.props.url, httpRequest.status, httpRequest.responseText);
        }
      }
    };

    const url = `https://api.github.com/repos/${repository.author}/${repository.repository}/issues?page=1&per_page=2`
    httpRequest.open('GET', url, true);
    httpRequest.send();
  };

  render() {
    return (
      <div className='IssuesBox'>
        <RepositoryForm onRepositorySubmit={this.handleRepositorySubmit}/>
        <RepositoryName author={this.state.author} repository={this.state.repository} />
        <IssuesList data={this.state.data} open_issues_count={this.state.open_issues_count} />
      </div>
    );
  }
}

export default IssuesBox;
