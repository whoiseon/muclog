import styled from "@emotion/styled";
import {$BACKGROUND_COLOR_WHITE} from "styles/variables";

export const Wrapper = styled.div`
  width: 660px;
  height: 100%;
  margin: 0 auto;
`;

export const ProfileWrapper = styled.div`
  margin-top: 20px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const MyBackground = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  
  button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: ${$BACKGROUND_COLOR_WHITE};
    padding: 8px;
    border-radius: 50%;
    opacity: 0.5;
    
    &:hover {
      opacity: 1;
    }
  }
`;

export const MyProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 140px;
  font-size: 16px;
`;

export const UserProfile = styled.div`
  position: absolute;
  top: -43px;
  margin-right: 12px;
  border-radius: 50%;
  
  & > img {
    border-radius: 50%;
    object-fit: cover;
  }
  
  button {
    position: absolute;
    bottom: -6px;
    right: -6px;
    background-color: ${$BACKGROUND_COLOR_WHITE};
    padding: 6px;
    border-radius: 50%;
    
    img {
      border-radius: 0;
      padding-bottom: 2px;
      width: auto;
      height: auto;
    }
  }
`;

export const LogList = styled.div`
  padding-bottom: 60px;
  margin-top: 20px;
`;
