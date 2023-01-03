import styled from "@emotion/styled";
import {$BACKGROUND_COLOR_BLACK, $COLOR_MAIN} from "styles/variables";
import {keyframes} from "@emotion/react";

export const Wrapper = styled.div`
  margin-bottom: 10px;

  button {
    width: 100%;
    height: auto;
    border-radius: 0;
    line-height: 20px;
    transition: box-shadow 0.16s ease;
    text-align: left;
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
