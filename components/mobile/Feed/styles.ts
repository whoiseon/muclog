import styled from "@emotion/styled";
import {$BACKGROUND_COLOR_WHITE, $COLOR_GRAY} from "styles/variables";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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
  margin-bottom: 10px;
`;

export const Profile = styled.div`
  position: absolute;
  top: -43px;
  margin-right: 12px;
  border-radius: 50%;
  
  img {
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

export const MyName = styled.div`
  margin-top: 43px;

  div:nth-of-type(1) {
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-bottom: 6px;
    
    button {
      display: flex;
      padding: 6px 6px 7px;
      background: none;
      margin-left: 2px;
      opacity: 0.5;
      
      &:hover {
        opacity: 1;
      }
    }
  }
  
  div:nth-of-type(2) {
    opacity: 0.5;
  }
`;

export const LogList = styled.div`
  padding-bottom: 60px;
`;

export const ColorInputWrapper = styled.div`
  padding: 20px;

  p {
    margin-bottom: 20px;
  }
  
  input {
    width: 100%;
    height: 100px;
    border: none;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;

    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    
    &::-webkit-color-swatch {
      border-radius: 4px;
      border: none;
    }
  }
  
  div {
    width: 100%;
    height: 60px;
    border-radius: 4px;
    background-color: red;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 20px;
  }
`;

export const PhotoChangeWrapper = styled.div`
  padding: 20px;
  
  & > div {
    position: relative;
    
    label {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 200px;
      cursor: pointer;
      
      span {
        opacity: 0.5;
      }
      
      img {
        object-fit: cover;
        object-position: center center;
      }
    }
  }
`;

export const NameChangeWrapper = styled.div`
  padding: 20px;
  
  input {
    width: 100%;
    padding: 12px 16px;
  }
`;

export const EmptyLogs = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 60px;
  
  p {
    font-size: 18px;
    opacity: 0.5;
  }
`;
