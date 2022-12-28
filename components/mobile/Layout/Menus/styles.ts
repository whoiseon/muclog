import styled from "@emotion/styled";
import {$BACKGROUND_COLOR_BLACK, $BACKGROUND_COLOR_EXTRA_BLACK, $COLOR_GRAY, $COLOR_RED} from "styles/variables";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    opacity: 60%;
    
    li:first-of-type {
      a {
        border: none;
      }
    }
    
    li {
      width: 100%;
      padding: 0 20px;
      
      a {
        display: flex;
        width: 100%;
        font-weight: bold;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        padding: 16px 0;
        
        &:hover {
          opacity: 40%;
        }
        
        & > div {
          display: flex;
          align-items: center;
          
          span {
            padding-top: 1px;
          }
        }
      }
      
      button {
        background: none;
        padding: 16px 0;
        width: 100%;
        color: ${$COLOR_RED};

        &:hover {
          opacity: 40%;
        }
      }
    }
  }
`;

export const MyName = styled.h1`
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  font-size: 16px;
  margin-bottom: 20px;
  
  span:nth-of-type(2) {
    margin-left: 6px;
    font-size: 14px;
    opacity: 0.5;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  cursor: pointer;
  opacity: 50%;
  transition: opacity 0.16s ease;
  
  &:hover {
    opacity: 100%;
  }
`;

export const Icon = styled.div`
  margin-right: 14px;
`;

export const ArrowIcon = styled.div`
  margin-left: auto;
`;

export const DarkModeToggle = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  text-align: center;
  opacity: 80%;
  
  button {
    background: none;
    color: inherit;
    padding: 16px;
  }
  
  &:hover {
    opacity: 100%;
  }
`;
