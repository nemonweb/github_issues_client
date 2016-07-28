import React, { Component } from 'react';
import './PageSize.css';

class PageSize extends Component {
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
    return (
      <div className='pageSizeForm'>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label className="pageSizeForm-label">Кол-во issues на странице</label>
            <div>
              <input type='number' placeholder='Кол-во issues на странице'
                className="pageSizeForm-input"
                value={this.state.pageSize}
                onChange={this.handlePageSizeChange}
                />
              <input type="submit" value="Save" className="pageSizeForm-save" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PageSize;
