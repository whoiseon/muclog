import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

const BackgroundLayerAnimation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100%;
  }
`

export const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  transition: opacity 0.5s ease;
  animation: ${BackgroundLayerAnimation} 0.5s ease;
`;

const ModalAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  
  60% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
`

export const Wrapper = styled.div<{ isDesktop?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ isDesktop }) => isDesktop ? '460px' : '100%'};
  border-radius: 4px;
  animation: ${ModalAnimation} 0.5s ease;
  
  h1 {
    font-size: 14px;
    padding: 20px;
  }
`;

export const Text = styled.div<{ isDesktop?: boolean }>`
  padding: ${({ isDesktop }) => isDesktop ? '30px 20px' : '20px 20px 30px'};
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  
  button {
    padding: 12px 0;
  }

  button:first-of-type {
    margin-bottom: 10px;
  }
`;
