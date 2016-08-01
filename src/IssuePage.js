import React, { Component } from 'react';
import moment from 'moment';
import './IssuePage.css';
import { IndexLink } from 'react-router';

export default class IssuePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: {},
      user: {}
    };
  }

  loadIssueFromServer() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          const response = JSON.parse(httpRequest.responseText);
          // todo add loader
          this.setState({ data: response, user: response.user });
        } else {
          // todo add error message
        }
      }
    };
    const url = `https://api.github.com/repos/${this.props.params.repoAuthor}/${this.props.params.repoName}/issues/${this.props.params.issueId}`
    httpRequest.open('GET', url, true);
    httpRequest.send();
  }

  componentDidMount() {
    this.loadIssueFromServer();
  }

  render() {
    return (
      <div className='container'>
        <div className='issue-page'>
          <div className='issue-page__left'>
            <a className='link' href={this.state.user.html_url}>
              <img className='issue-page__avatar' src={this.state.user.avatar_url} role='presentation' />
              <div>{this.state.user.login}</div>
            </a>
          </div>
          <div className='issue-page__right'>
            <div className='issue-page__header'>
              <a className='link issue-page__title' href={this.state.data.html_url}>
                {this.state.data.title}
              </a>
              <div className='issue-page__info'>
                #{this.state.data.number} openned {moment(this.state.data.created_at).fromNow()}
              </div>
            </div>
            <div className='issue-page__body'>
              <div>
                status: {this.state.data.state}
              </div>

              <div>
                comments: {this.state.data.comments}
              </div>

              <div>
                {this.state.data.body}
              </div>
            </div>
          </div>
        </div>
        <IndexLink to="/" className='link'>go to Home</IndexLink>
      </div>
    );
  }
}
