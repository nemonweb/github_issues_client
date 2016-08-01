import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import './IssueItem.css';

export default class IssueItem extends Component {
  render() {

    return (
      <div className='issue-item'>
        <a className='issue-item__title' href={this.props.html_url}>
          {this.props.title}
        </a>
        <div className='issue-item__info'>
          #{this.props.number} openned {moment(this.props.created_at).fromNow()}
        </div>
        <Link to={`/${this.props.author}/${this.props.repository}/issues/${this.props.number}`}>
          Подробнее
        </Link>
      </div>
    );
  }
}
