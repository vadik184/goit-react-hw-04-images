import styled from 'styled-components';
export const StyledModal = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1100;
`;
export const StyledImg = styled('img')`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
