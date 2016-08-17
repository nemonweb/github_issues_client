import React, { Component } from 'react';
import styles from './RepositoryName.sss';

export default class RepositoryName extends Component {
  repositoryUrl() {
    return `https://github.com/${this.props.repoAuthor}/${this.props.repoName}`;
  }
  authorUrl() {
    return `https://github.com/${this.props.repoAuthor}`;
  }
  render() {
    if (this.props.repoAuthor) {
      return (
        <div className={styles.root}>
          <div className="container">
            <a className={styles.text} href={this.authorUrl()}>
              {this.props.repoAuthor}
            </a>

            <span className={styles.divider}>/</span>

            <a className={styles.text} href={this.repositoryUrl()}>
              {this.props.repoName}
            </a>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
