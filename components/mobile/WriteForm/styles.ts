import styled from "@emotion/styled";
import {$BACKGROUND_COLOR_BLACK, $COLOR_MAIN} from "styles/variables";
import {keyframes} from "@emotion/react";

export const Form = styled.form`

`;

export const Editor = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
`;

export const Textarea = styled.div<{ focus: boolean }>`
  textarea {
    width: 100%;
    padding: 20px;
    height: auto;
    border-radius: 0;
    line-height: 20px;
    box-shadow: ${({ focus }) => focus ? `0 3px 6px rgba(0, 0, 0, 0.2)` : 'none'};
    transition: box-shadow 0.16s ease;
  }
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

const FocusAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
`

export const FocusUnderline = styled.div`
  position: absolute;
  left: 0;
  bottom: 4px;
  width: 100%;
  height: 1px;
  background-color: ${$COLOR_MAIN};
  animation: ${FocusAnimation} 0.3s ease-in;
`;

export const LogList = styled.div`

`;
