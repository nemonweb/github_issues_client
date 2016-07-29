import React, { Component } from 'react';
import IssuesList from './IssuesList';
import RepositoryForm from './RepositoryForm';
import RepositoryName from './RepositoryName';
import PageSize from './PageSize';
import Pagination from 'rc-pagination';
import './index.css';
import './pagination.css';

import AlertContainer from 'react-alert';

class IssuesBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: [],
      currentPage: 1,
      pageSize: 10,
      open_issues_count: 0,
      repositoryAuthor: '',
      repositoryName: ''
    }

    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
  };

  baseUrl = 'https://api.github.com/repos';

  loadIssuesFromServer = () => {
    if (this.state.repositoryAuthor === '' || this.state.repositoryName === '') {
      return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          const response = JSON.parse(httpRequest.responseText);
          this.setState({ data: response });
        } else {
          // console.error(this.props.url, httpRequest.status, httpRequest.responseText);
          this.msg.error(httpRequest.statusText, {
            time: 2000,
            type: 'error',
          });
        }
      }
    }
    const url = `${this.baseUrl}/${this.state.repositoryAuthor}/${this.state.repositoryName}/issues?page=${this.state.currentPage}&per_page=${this.state.pageSize}`
    httpRequest.open('GET', url, true);
    httpRequest.send();
  };

  loadTotalIssuesFromServer = () => {
    if (this.state.repositoryAuthor === '' || this.state.repositoryName === '') {
      return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          const response = JSON.parse(httpRequest.responseText);
          this.setState({ open_issues_count: response.open_issues_count });
        } else {
          console.error(this.props.url, httpRequest.status, httpRequest.responseText);
        }
      }
    };

    const url = `${this.baseUrl}/${this.state.repositoryAuthor}/${this.state.repositoryName}`
    httpRequest.open('GET', url, true);
    httpRequest.send();
  }

  handleRepositorySubmit = repository => {
    this.setState({ repositoryAuthor: repository.author, repositoryName: repository.repository }, () => {
      this.loadIssuesFromServer();
      this.loadTotalIssuesFromServer();
    });
  };


  handleChangePage = page => {
    this.setState({ currentPage: page }, () => {
      this.loadIssuesFromServer();
      this.loadTotalIssuesFromServer();
    });
  }

  handlePageSizeSubmit = pageSize => {
    this.setState({ pageSize: pageSize.size }, () => {
      this.loadIssuesFromServer();
      this.loadTotalIssuesFromServer();
    });
  }

  render() {
    let pagination;
    if (this.state.open_issues_count && this.state.open_issues_count > this.state.pageSize){
      pagination = <Pagination
        onChange={this.handleChangePage}
        current={this.state.currentPage}
        total={this.state.open_issues_count}
        pageSize={this.state.pageSize} />
    }

    return (
      <div className='IssuesBox'>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <RepositoryForm onRepositorySubmit={this.handleRepositorySubmit}/>
        <RepositoryName author={this.state.repositoryAuthor} repository={this.state.repositoryName} />
        <PageSize onPageSizeSubmit={this.handlePageSizeSubmit}/>
        <IssuesList data={this.state.data} open_issues_count={this.state.open_issues_count} />
        <div className="container">
          { pagination }
        </div>


      </div>
    );
  }
}

export default IssuesBox;
