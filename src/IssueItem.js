import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import './IssueItem.css';

export default class IssueItem extends Component {
  render() {

    return (
      <div className='issue-item'>
        <a className='issue-item__title' href={this.props.issueData.html_url}>
          {this.props.issueData.title}
        </a>
        <div className='issue-item__info'>
          #{this.props.number} openned {moment(this.props.issueData.created_at).fromNow()}
        </div>
        <Link to={`/${this.props.repoAuthor}/${this.props.repoName}/issues/${this.props.issueData.number}`}>
          Подробнее
        </Link>
      </div>
    );
  }
}
