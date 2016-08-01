import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import './IssueItem.css';

export default class IssueItem extends Component {
  render() {

    return (
      <div className='issue-item'>
        <div className='issue-item__left'>
          <a className='link' href={this.props.issueData.user.html_url}>
            <img className='issue-item__avatar' src={this.props.issueData.user.avatar_url} role='presentation' />
            <div>{this.props.issueData.user.login}</div>
          </a>
        </div>
        <div className='issue-item__right'>
          <a className='link issue-item__title' href={this.props.issueData.html_url}>
            {this.props.issueData.title}
          </a>
          <div className='issue-item__info'>
            #{this.props.number} openned {moment(this.props.issueData.created_at).fromNow()}
          </div>
          <Link className='link' to={`/${this.props.repoAuthor}/${this.props.repoName}/issues/${this.props.issueData.number}`}>
            Подробнее
          </Link>
        </div>
      </div>
    );
  }
}
