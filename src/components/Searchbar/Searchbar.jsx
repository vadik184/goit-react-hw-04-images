import React, { useState } from 'react';
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
export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      Notify.info('Enter your request, please!', paramsForNotify);
      return;
    }

    onSubmit(query);
  };
  return (
    <StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <StyledformBtn type="submit">
          <GoSearch size="24" />
        </StyledformBtn>
        <StyledInput
          name="search"
          type="text"
          placeholder="search"
          autoComplete="off"
          autoFocus
          defaultValue={query}
          onChange={handleChange}
        />
      </StyledForm>
    </StyledHeader>
  );
};
