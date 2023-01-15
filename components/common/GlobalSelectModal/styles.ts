import styled from "@emotion/styled";
import {$COLOR_MAIN, $COLOR_WHITE} from "styles/variables";
import {keyframes} from "@emotion/react";

const ModalAnimation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const ButtonAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Background = styled.div`
  display: flex;
  position: fixed;
  align-items: self-end;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  animation: ${ModalAnimation} 0.16s ease-in;
  
  ul {
    width: 100%;
    padding-bottom: 10px;
    animation: ${ButtonAnimation} 0.2s ease-in;
    
    li {
      margin-bottom: 6px;
      
      button {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 20px;
        background: none;
        transition: none;
        border-radius: 10px;
        
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
