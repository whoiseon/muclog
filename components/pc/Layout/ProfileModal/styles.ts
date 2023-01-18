import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";
import {$COLOR_RED} from "styles/variables";

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

export const Background = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  width: 380px;
  z-index: 100;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  animation: ${ModalAnimation} 0.3s ease-in;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  
`;

export const MyBackground = styled.div<{ profileColor: string | null  }>`
  width: 100%;
  height: 80px;
  border-radius: 4px 4px 0 0;
  background-color: ${({ profileColor }) => profileColor};
`;

export const MyProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 100px;
  font-size: 14px;
  cursor: pointer;
`;

export const Profile = styled.div`
  position: absolute;
  top: -28px;
  margin-right: 12px;
  border-radius: 50%;
  
  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const MyName = styled.div`
  margin-top: 24px;
  
  p:nth-of-type(1) {
    font-weight: bold;
    margin-bottom: 6px;
  }
  
  p:nth-of-type(2) {
    opacity: 0.5;
  }
`;

export const Tools = styled.ul`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  
  button {
    width: 100%;
    background: none;
    color: ${$COLOR_RED};
    border-radius: 0;
    padding: 16px 0;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;
