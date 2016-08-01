import React, { Component } from 'react';
import styles from './PageSize.sss';

export default class PageSize extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { pageSize: '10' }
  }

  handlePageSizeChange = e => {
    this.setState({ pageSize: parseInt(e.target.value, 10) })
  };


  handleSubmit = e => {
    e.preventDefault();
    const pageSize = this.state.pageSize;
    if (!pageSize) {
      return;
    }

    this.props.onPageSizeSubmit({ size: pageSize });
  }

  render() {
    if(this.props.open_issues_count > 0) {
      return (
        <div className={styles.root}>
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <label>Кол-во issues на странице</label>
              <div>
                <input type='number' placeholder='Кол-во issues на странице'
                  className={styles.input}
                  value={this.state.pageSize}
                  onChange={this.handlePageSizeChange}
                  />
                <input type="submit" value="Save" className={styles.save} />
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
