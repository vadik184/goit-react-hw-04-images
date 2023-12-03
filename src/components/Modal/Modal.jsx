import React, { useEffect } from 'react';
import { StyledModal, StyledImg } from 'components/Modal/ModalStyled';

export const Modal = ({ closeModal, url, tags }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <StyledModal onClick={handleClick}>
      <StyledImg src={url} alt={tags} />
    </StyledModal>
  );
};
