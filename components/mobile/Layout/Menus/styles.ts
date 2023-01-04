import styled from "@emotion/styled";
import {$BACKGROUND_COLOR_MEDIUM_BLACK, $BACKGROUND_COLOR_SEMI_BLACK, $COLOR_MAIN, $COLOR_RED} from "styles/variables";

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

export const MyBackground = styled.div`
  width: 100%;
  height: 86px;
`;

export const MyProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 140px;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const Profile = styled.div`
  position: absolute;
  top: -43px;
  margin-right: 12px;
  border-radius: 50%;
  
  img {
    border-radius: 50%;
  }
`;

export const MyName = styled.div`
  margin-top: 43px;

  p:nth-of-type(1) {
    font-weight: bold;
    margin-bottom: 6px;
  }
  
  p:nth-of-type(2) {
    opacity: 0.5;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 12px;
  cursor: pointer;
  transition: opacity 0.16s ease;
  background-color: ${$BACKGROUND_COLOR_MEDIUM_BLACK};
  opacity: 0.5;
  border-radius: 50%;
  
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
