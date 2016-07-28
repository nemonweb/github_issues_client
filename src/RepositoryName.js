import React, { Component } from 'react';
import './RepositoryName.css';

class RepositoryName extends Component {
  repositoryUrl() {
    return `https://github.com/${this.props.author}/${this.props.repository}`;
  }
  authorUrl() {
    return `https://github.com/${this.props.author}`;
  }
  render() {
    if (this.props.author) {
      return (
        <div className="RepositoryName">
          <div className="container">
            <a className="RepositoryName-repository-name" href={this.authorUrl()}>
              {this.props.author}
            </a>

            <span className="RepositoryName-divider">/</span>

            <a className="RepositoryName-repository-name" href={this.repositoryUrl()}>
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

export default RepositoryName;
