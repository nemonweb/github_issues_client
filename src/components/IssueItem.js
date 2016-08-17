import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import styles from './IssueItem.sss';

export default class IssueItem extends Component {
  render() {

    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <a className='link' href={this.props.issueData.user.html_url}>
            <img className={styles.avatar} src={this.props.issueData.user.avatar_url} role='presentation' />
            <div>{this.props.issueData.user.login}</div>
          </a>
        </div>
        <div className={styles.right}>
          <a className={styles.title} href={this.props.issueData.html_url}>
            {this.props.issueData.title}
          </a>
          <div className={styles.info}>
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
