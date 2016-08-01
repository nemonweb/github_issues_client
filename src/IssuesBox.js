import React, { Component } from 'react';
import IssuesList from './IssuesList';
import RepositoryForm from './RepositoryForm';
import RepositoryName from './RepositoryName';
import PageSize from './PageSize';
import Loader from 'react-loader';
import Pagination from 'rc-pagination';
import './pagination.css';
import './index.css';
import AlertContainer from 'react-alert';

export default class IssuesBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loaded: true,
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
          this.setState({ data: response, loaded: true });
        } else {
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
          this.msg.error(httpRequest.statusText, {
            time: 2000,
            type: 'error',
          });
        }
      }
    };

    const url = `${this.baseUrl}/${this.state.repositoryAuthor}/${this.state.repositoryName}`
    httpRequest.open('GET', url, true);
    httpRequest.send();
  }

  handleRepositorySubmit = repository => {
    this.setState({ repositoryAuthor: repository.author, repositoryName: repository.repository, loaded: false }, () => {
      this.loadIssuesFromServer();
      this.loadTotalIssuesFromServer();
    });
  };


  handleChangePage = page => {
    this.setState({ currentPage: page, loaded: false }, () => {
      this.loadIssuesFromServer();
      this.loadTotalIssuesFromServer();
    });
  }

  handlePageSizeSubmit = pageSize => {
    this.setState({ pageSize: pageSize.size, loaded: false }, () => {
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
        <AlertContainer ref={a => { this.msg = a; return a; } } {...this.alertOptions} />
        <RepositoryForm onRepositorySubmit={this.handleRepositorySubmit}/>
        <RepositoryName author={this.state.repositoryAuthor} repository={this.state.repositoryName} />
        <PageSize open_issues_count={this.state.open_issues_count} onPageSizeSubmit={this.handlePageSizeSubmit}/>
        <Loader loaded={this.state.loaded}>
          <IssuesList data={this.state.data} open_issues_count={this.state.open_issues_count} author={this.state.repositoryAuthor} repository={this.state.repositoryName} />
        </Loader>
        <div className="container">
          { pagination }
        </div>


      </div>
    );
  }
}
