import React, { Component } from 'react';
import Issue from './Issue';
import './IssuesList.css';

export default class IssuesList extends Component {
  render() {
    const issueNodes = this.props.data.map( issue => {
      return (
        <Issue
          key={issue.id}
          number={issue.number}
          title={issue.title}
          created_at={issue.created_at}
          url={issue.url}
        />
      );
    });

    if (issueNodes.length > 0) {
      return (
        <div className="issues-list">
          <div className="container">
            <div className="issues-list__header">
              <span className="issues-list__issues-count">
                {this.props.open_issues_count} Open
              </span>
            </div>

            <div className="issues-list__nodes">
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
