import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

export const LogInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 0;
`;

export const Profile = styled.div`
  margin-right: 12px;
  cursor: pointer;
  
  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  
`;

export const UserName = styled.div`
  margin-bottom: 2px;
  cursor: pointer;
  
  p {
    font-weight: bold;
  }
`;

export const CreatedAt = styled.div`
  p {
    opacity: 0.3;
  }
`;

export const Attachment = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  
  img {
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
  
  button {
    position: absolute;
    top: 20px;
    right: 0;
    background: none;
    padding: 20px;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
`;

export const Content = styled.div`
  padding: 20px;
  line-height: 24px;
`;

export const MoreButton = styled.div`
  position: absolute;
  top: 6px;
  right: 0;
  transition: opacity 0.16s ease-in;
  
  & > button {
    background: none;
    padding: 16px 22px;
    opacity: 0.3;
    
    &:hover {
      opacity: 1;
    }
  }
`;

const LogToolsActiveAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  
  20% {
    transform: rotate(5deg);
  }
  
  40% {
    transform: rotate(-5deg);
  }
  
  60% {
    transform: rotate(5deg);
  }

  80% {
    transform: scale(1.12) rotate(-5deg);
  }
  
  100% {
    transform: scale(1) rotate(0);
  }
`

export const LogTools = styled.div`
  width: 100%;
  display: flex;
  
  button {
    display: flex;
    justify-content: center;
    width: 50%;
    background: none;
    border-radius: 0;
    padding: 12px 0;
    
    img {
      margin-right: 10px;
    }
    
    &:active {
      animation: ${LogToolsActiveAnimation} 0.5s ease-in;
    }
  }
`;

export const CommentList = styled.div`
  padding-top: 12px;
  
  form {
    display: flex;
    padding: 14px 20px;
    margin-top: 12px;
    
    img {
      margin-right: 14px;
      border-radius: 50%;
    }
    
    input {
      width: 100%;
      padding: 0 12px;
    }
  }
`;

export const NoComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  opacity: 0.3;
  
  img {
    margin-bottom: 20px;
  }
`;

export const EditForm = styled.form`
  padding: 20px;

  textarea {
    width: 100%;
    padding: 20px;
    height: auto;
    border-radius: 4px;
    line-height: 20px;
  }
  
  & > div {
    margin-top: 10px;
    display: flex;
    
    button {
      width: 100%;
      padding: 12px 0;
    }

    button:first-of-type {
      margin-right: 10px;
    }
  }
`;

export const CommentMoreButton = styled.div`
  button {
    width: 100%;
    padding: 20px 0;
    border-radius: 0;
    background: none;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      
      span {
        opacity: 1;
      }
    }
    
    span {
      opacity: 0.5;
    }
  }
`;
