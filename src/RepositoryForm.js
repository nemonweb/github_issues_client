import React, { Component } from 'react';
import './RepositoryForm.css';

class RepositoryForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { author: 'facebookincubator', repository: 'create-react-app' }
  }

  handleAuthorChange = e => {
    this.setState({ author: e.target.value })
  };

  handleRepositoryChange = e => {
    this.setState({ repository: e.target.value })
  };

  handleSubmit = e => {
    e.preventDefault();
    const author = this.state.author.trim();
    const repository = this.state.repository.trim();
    if (!repository || !author) {
      return;
    }

    this.props.onRepositorySubmit({ author: author, repository: repository });
    // this.setState({ author: '', repository: '' });
  }

  render() {
    return (
      <div className='repositoryForm'>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <input type='text' placeholder='User name'
              className="repositoryForm-input repositoryForm-input--left"
              value={this.state.author}
              onChange={this.handleAuthorChange}
              />
            <input type='text' placeholder='Repository name'
              className="repositoryForm-input repositoryForm-input--right"
              value={this.state.repository}
              onChange={this.handleRepositoryChange}
              />
            <input type="submit" value="Поиск" className="repositoryForm-find" />
          </form>
        </div>
      </div>
    );
  }
}

export default RepositoryForm;
