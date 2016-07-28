import React, { Component } from 'react';
import moment from 'moment';
import './issue.css';

class Issue extends Component {
  render() {

    return (
      <div className='issue'>
        <a className='issueTitle' href={this.props.url}>
          {this.props.title}
        </a>
        <div className='issueInfo'>
          #{this.props.number} openned {moment(this.props.created_at).fromNow()}
        </div>
      </div>
    );
  }
}

export default Issue;
