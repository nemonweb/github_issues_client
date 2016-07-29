import React, { Component } from 'react';
import moment from 'moment';
import './issue.css';

export default class Issue extends Component {
  render() {

    return (
      <div className='issue'>
        <a className='issue__title' href={this.props.url}>
          {this.props.title}
        </a>
        <div className='issue__info'>
          #{this.props.number} openned {moment(this.props.created_at).fromNow()}
        </div>
      </div>
    );
  }
}
