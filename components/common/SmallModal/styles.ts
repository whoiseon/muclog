import styled from "@emotion/styled";
import {$COLOR_MAIN, $COLOR_WHITE} from "styles/variables";
import {keyframes} from "@emotion/react";

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

export const Wrapper = styled.div<{ top: number, right: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  right: ${({ right }) => right}px;
  width: 140px;
  padding: 10px;
  border-radius: 6px;
  animation: ${ModalAnimation} 0.3s ease;
  
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
