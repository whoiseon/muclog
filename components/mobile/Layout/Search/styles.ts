import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  header {
    display: flex;
    width: 100%;
    padding: 10px 0;
    
    button {
      padding: 18px 20px;
      background: none;
    }
    
    & > div {
      width: 100%;
      display: flex;
      align-items: center;
      padding-right: 20px;
      
      input {
        width: 100%;
        padding: 12px 16px;
      }
    }
  }
`;

export const EmptyUser = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 40px;
  
  h1 {
    font-size: 18px;
    opacity: 0.3;
    font-weight: 500;
  }
`;
