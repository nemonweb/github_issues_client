import React, { Component } from 'react';
import './RepositoryName.css';

export default class RepositoryName extends Component {
  repositoryUrl() {
    return `https://github.com/${this.props.author}/${this.props.repository}`;
  }
  authorUrl() {
    return `https://github.com/${this.props.author}`;
  }
  render() {
    if (this.props.author) {
      return (
        <div className="repository_name">
          <div className="container">
            <a className="repository_name__text" href={this.authorUrl()}>
              {this.props.author}
            </a>

            <span className="repository_name__divider">/</span>

            <a className="repository_name__text" href={this.repositoryUrl()}>
              {this.props.repository}
            </a>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
