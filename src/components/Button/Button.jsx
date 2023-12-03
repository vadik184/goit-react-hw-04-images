import React from 'react';
import { ButtonStyled, BtnContainer } from 'components/Button/ButtonStyle';

export const LoadMoreBtn = ({ onClick, children }) => {
  return (
    <BtnContainer>
      <ButtonStyled onClick={onClick}>{children}</ButtonStyled>
    </BtnContainer>
  );
};
