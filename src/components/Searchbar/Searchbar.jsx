import React, { Component } from 'react';
import {
  StyledHeader,
  StyledForm,
  StyledformBtn,
  StyledInput,
} from 'components/Searchbar/SearchbarStyled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { GoSearch } from 'react-icons/go';

export const paramsForNotify = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '24px',
};
export class Searchbar extends Component {
  state = {
    q: '',
  };

  handleChange = evt => {
    this.setState({ q: evt.target.value, error: '' });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { q } = this.state;

    if (q.trim() === '') {
      Notify.info('Enter your request, please!', paramsForNotify);
      return;
    }

    this.props.onSubmit(q);
  };

  render() {
    return (
      <StyledHeader>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledformBtn type="submit">
            <GoSearch size="24" />
          </StyledformBtn>
          <StyledInput
            name="search"
            type="text"
            placeholder="search"
            autoComplete="off"
            autoFocus
            defaultValue={this.state.q}
            onChange={this.handleChange}
          />
        </StyledForm>
      </StyledHeader>
    );
  }
}
