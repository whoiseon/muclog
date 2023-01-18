import styled from "@emotion/styled";
import {$COLOR_MAIN, $COLOR_WHITE} from "styles/variables";
import {keyframes} from "@emotion/react";

const ModalAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

export const Wrapper = styled.div<{ top?: number, right?: number, left?: number, bottom?: number }>`
  position: absolute;
  top: ${({ top }) => top ? top : null}px;
  bottom: ${({ bottom }) => bottom ? bottom : null}px;
  right: ${({ right }) => right ? right : null}px;
  left: ${({ left }) => left ? left : null}px;
  width: 140px;
  padding: 10px;
  border-radius: 6px;
  animation: ${ModalAnimation} 0.1s ease-in;
  z-index: 9;
  
  ul {
    li {
      button {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px;
        background: none;
        transition: none;
        
        &:hover {
          background-color: ${$COLOR_MAIN};
          
          span {
            color: ${$COLOR_WHITE};
            opacity: 1;
          }
        }
        
        span {
          opacity: 0.5;
        }
        
        span:nth-of-type(2) {
          margin-left: auto;
        }
      }
    }
  }
`;