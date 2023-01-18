import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";
import {$COLOR_MAIN} from "styles/variables";

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
  position: relative;
  display: flex;
  flex-direction: column;
  width: 560px;
  border-radius: 4px;
  animation: ${ModalAnimation} 0.5s ease;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  &::-webkit-scrollbar {
    display: none;
  }
  
  h1 {
    font-size: 14px;
    padding: 20px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  cursor: pointer;
  background: none;
  opacity: 50%;
  transition: opacity 0.16s ease;
  z-index: 2;
  
  &:hover {
    opacity: 100%;
    background: none;
  }
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  cursor: text;
`;

export const Textarea = styled.div`
  overflow-y: scroll;
  max-height: 540px;

  &::-webkit-scrollbar {
    display: none;
  }
  
  textarea {
    width: 100%;
    padding: 20px;
    border: none;
    border-radius: 0;
    font-size: 18px;
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const WriteTools = styled.div`
  label {
    display: flex;
    align-items: center;
    padding: 30px;
    cursor: pointer;
    background: none;
    transition: all 0.16s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    & > div {
      margin-right: 20px;
    }

    span {
      opacity: 0.5;
    }
  }
`;

export const Submit = styled.div`
  padding: 0 20px 20px;
  
  button {
    width: 100%;
    padding: 16px 0;
    font-size: 16px;

    &:disabled {
      opacity: 0.5;
      cursor: unset;

      &:hover {
        background-color: ${$COLOR_MAIN};
      }
    }
  }
`;
