import React, { Component } from 'react';
import IssueItem from './IssueItem';
import styles from './IssuesList.sss';

export default class IssuesList extends Component {
  render() {
    const issueNodes = this.props.data.map( issue => {
      return (
        <IssueItem
          key={issue.id}
          issueData={issue}
          repoAuthor={this.props.repoAuthor}
          repoName={this.props.repoName}
        />
      );
    });

    if (issueNodes.length > 0) {
      return (
        <div>
          <div className="container">
            <div className={styles.header}>
              <span className={styles.issuesCount}>
                {this.props.open_issues_count} Open
              </span>
            </div>

            <div className={styles.nodes}>
              {issueNodes}
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
