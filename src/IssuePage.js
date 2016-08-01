import React, { Component } from 'react';
import moment from 'moment';
import './IssueItem.css';
import { IndexLink } from 'react-router';

export default class IssuePage extends Component {
  render() {

    return (
      <div>
        <div className='issue-item'>
          <a className='issue-item__title' href={this.props.params.userName}>
            {this.props.params.userName}
          </a>
          <div className='issue-item__info'>
            #{this.props.number} openned {moment(this.props.created_at).fromNow()}
          </div>
        </div>
        <IndexLink to="/">go to Home</IndexLink>
      </div>
    );
  }
}
