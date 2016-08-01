import React, { Component } from 'react';
import moment from 'moment';
import './IssueItem.css';
import { IndexLink } from 'react-router';

export default class IssuePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: []
    };
  }

  loadIssueFromServer() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          const response = JSON.parse(httpRequest.responseText);
          // todo add loader
          this.setState({ data: response });
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
      <div>
        <div className='issue-item'>
          <a className='issue-item__title' href={this.state.data.html_url}>
            {this.state.data.title}
          </a>
          <div className='issue-item__info'>
            #{this.state.data.number} openned {moment(this.state.data.created_at).fromNow()}
          </div>

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
        <IndexLink to="/">go to Home</IndexLink>
      </div>
    );
  }
}
