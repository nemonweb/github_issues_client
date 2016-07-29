import React, { Component } from 'react';
import './RepositoryForm.css';
import Autocomplete from 'react-autocomplete'

class RepositoryForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { author: '', repository: '', repos: [] }
  }

  handleAuthorChange = e => {
    this.setState({ author: e.target.value })
  };

  handleRepositoryChange = e => {
    this.setState({ repository: e.target.value })
  };

  handleReposAuthorOnBlur = () => {
    if (this.state.author === '') {
      return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          const response = JSON.parse(httpRequest.responseText);
          this.setState({ repos: response });
        } else {
          console.error(this.props.url, httpRequest.status, httpRequest.responseText);
        }
      }
    };

    const url = `https://api.github.com/users/${this.state.author}/repos`;
    httpRequest.open('GET', url, true);
    httpRequest.send();
  }

  matchReposToTerm (repos, value) {
    return (
      repos.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  sortRepos (a, b, value) {
    return (
      a.name.toLowerCase().indexOf(value.toLowerCase()) >
      b.name.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
    )
  }

  handleAutocompleteSelect = value => {
    this.setState({ repository: value }, () => {
      const author = this.state.author.trim();
      const repository = this.state.repository.trim();
      if (!repository || !author) {
        return;
      }

      this.props.onRepositorySubmit({ author: author, repository: repository });
    });
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
              onBlur={this.handleReposAuthorOnBlur}
              />
            <Autocomplete
              className="repositoryForm-input repositoryForm-input--right"
              value={this.state.repository}
              inputProps={{ placeholder: "Repository name", id: "repos-autocomplete" }}
              items={this.state.repos}
              getItemValue={(item) => item.name}
              shouldItemRender={this.matchReposToTerm}
              sortItems={this.sortRepos}
              onChange={(event, value) => this.setState({ repository: value })}
              onSelect={this.handleAutocompleteSelect}
              renderItem={(item, isHighlighted) => (
                <div
                  className={isHighlighted ? 'repositoryForm-autocomplete-highlightedItem' : 'repositoryForm-autocomplete-item' }
                  key={item.id}
                >{item.name}</div>
              ) }
            />
          </form>
        </div>
      </div>
    );
  }
}

export default RepositoryForm;
