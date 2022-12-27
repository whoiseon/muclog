import styled from "@emotion/styled";

import {
  $BACKGROUND_COLOR_LIGHT_BLACK,
  $BACKGROUND_COLOR_LIGHT_BLACK_HOVER, $BACKGROUND_COLOR_MEDIUM_BLACK,
  $BORDER_RADIUS,
  $COLOR_GRAY, $COLOR_MAIN,
  $COLOR_PINK, $COLOR_RED
} from "styles/variables";

export const Background = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: 60px;
  
  form {
    display: flex;
    flex-direction: column;
    
    @media (max-width: 768px) {
      width: 100%;
    }
    
    & > p {
      font-weight: bold;
      color: ${$COLOR_GRAY};
      margin-bottom: 10px;
    }
    
    input {
      margin-bottom: 10px;
      height: 42px;
      padding: 0 14px;
    }
    
    button {
      margin-top: 10px;
      border-radius: ${$BORDER_RADIUS};
      height: 42px;
    }
  }
`;

export const Welcome = styled.div`
  text-align: center;
  margin-bottom: 20px;
  
  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  p {
    color: ${$COLOR_GRAY};
  }
`;

export const SocialLogin = styled.div`
  width: 100%;
  margin-bottom: 20px;
  
  p {
    font-weight: bold;
    color: ${$COLOR_GRAY};
    margin-bottom: 10px;
  }
  
  & > div {
    display: flex;
    align-items: center;
    width: 100%;
    flex: 1 1;
    
    button:nth-of-type(1) {
      margin-right: 10px;
    }
    
    button {
      width: 100%;
      height: 42px;
    }
  }
`;

export const SocialIcon = styled.div`
  margin-bottom: 0;
`;

export const ErrorMessage = styled.span`
  color: ${$COLOR_RED};
`;

export const ToggleAccount = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  
  span {
    margin-left: 6px;
    cursor: pointer;
    text-decoration: underline;
    color: ${$COLOR_MAIN};
  }
`;
