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
import checkStatus from './common/checkStatus';


export default class IssuesBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loaded: true,
      data: [],
      currentPage: 1,
      pageSize: 10,
      open_issues_count: 0,
      repoAuthor: '',
      repoName: ''
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
    if (this.state.repoAuthor === '' || this.state.repoName === '') {
      return;
    }

    fetch(`${this.baseUrl}/${this.state.repoAuthor}/${this.state.repoName}/issues?page=${this.state.currentPage}&per_page=${this.state.pageSize}`)
      .then( checkStatus )
      .then( json => {
        this.setState({ data: json, loaded: true });
      })
      .catch( error => {
        this.msg.error(error.response.statusText, {
          time: 2000,
          type: 'error',
        });
      });
  };

  loadTotalIssuesFromServer = () => {
    if (this.state.repoAuthor === '' || this.state.repoName === '') {
      return;
    }

    fetch(`${this.baseUrl}/${this.state.repoAuthor}/${this.state.repoName}`)
      .then( checkStatus )
      .then( json => {
        this.setState({ open_issues_count: json.open_issues_count });
      })
      .catch( error => {
        this.msg.error(error.response.statusText, {
          time: 2000,
          type: 'error',
        });
      });
  }

  handleRepositorySubmit = repository => {
    this.setState({ repoAuthor: repository.author, repoName: repository.repository, loaded: false }, () => {
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

        <RepositoryName repoAuthor={this.state.repoAuthor} repoName={this.state.repoName} />

        <PageSize open_issues_count={this.state.open_issues_count} onPageSizeSubmit={this.handlePageSizeSubmit}/>
        <Loader loaded={this.state.loaded}>
          <IssuesList
            data={this.state.data}
            open_issues_count={this.state.open_issues_count}
            repoAuthor={this.state.repoAuthor}
            repoName={this.state.repoName}
          />
        </Loader>
        <div className="container">
          { pagination }
        </div>
      </div>
    );
  }
}
