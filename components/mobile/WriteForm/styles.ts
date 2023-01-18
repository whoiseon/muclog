import styled from "@emotion/styled";

export const Wrapper = styled.div<{ isDesktop?: boolean }>`
  margin-bottom: ${({ isDesktop }) => isDesktop ? '20px' : '10px'};
  box-shadow: ${({ isDesktop }) => isDesktop ? '0 1px 3px rgba(0, 0, 0, 0.05)' : null};

  button {
    width: 100%;
    height: auto;
    line-height: 20px;
    transition: box-shadow 0.16s ease;
    text-align: left;
    
    & > div {
      img {
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
`;

export const ModalWrapper = styled.div<{ writeActive: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: ${({ writeActive }) => writeActive ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.1s ease-in;
  z-index: 999;
`;


export const TextareaTools = styled.div`
  height: 60px;
  display: flex;
  position: absolute;
  top: 0;
  right: 0;

  button {
    background: none;
    padding: 20px;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
`;
