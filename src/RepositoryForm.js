import React, { Component } from 'react';
import './RepositoryForm.sss';
import Autocomplete from 'react-autocomplete';
import AlertContainer from 'react-alert';

export default class RepositoryForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { author: '', repository: '', repos: [] }


    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
  }

  handleAuthorChange = e => {
    this.setState({ author: e.target.value })
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
          this.msg.error('Пользователь не найден', {
            time: 2000,
            type: 'error',
          });
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
      <div className='repository-form'>
      <AlertContainer ref={a => { this.msg = a; return a; } } {...this.alertOptions} />
        <div className="container">

          <form onSubmit={this.handleSubmit}>
            <span className='repository-form__label'>Issues</span>
            <input type='text' placeholder='User name'
              className="repository-form__input repository-form__input_left"
              value={this.state.author}
              onChange={this.handleAuthorChange}
              onBlur={this.handleReposAuthorOnBlur}
              />
            <Autocomplete
              value={this.state.repository}
              inputProps={{ placeholder: "Repository name", id: "repos-autocomplete", className: 'repository-form__input repository-form__input_right' }}
              items={this.state.repos}
              getItemValue={(item) => item.name}
              shouldItemRender={this.matchReposToTerm}
              sortItems={this.sortRepos}
              onChange={(event, value) => this.setState({ repository: value })}
              onSelect={this.handleAutocompleteSelect}
              renderItem={(item, isHighlighted) => (
                <div
                  className={isHighlighted ? 'repository-form__highlighted-item' : 'repository-form__autocomplete-item' }
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
