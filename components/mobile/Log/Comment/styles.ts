import styled from "@emotion/styled";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 12px 20px;
  
  & > img {
    position: absolute;
    top: 20px;
    left: -38px;
    opacity: 0.4;
  }
`;

export const Profile = styled.div`
  margin-right: 12px;
  cursor: pointer;
  
  img {
    border-radius: 50%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  & > button {
    background: none;
    text-align: left;
    font-weight: 400;
    opacity: 0.5;
    font-size: 12px;
    padding: 6px 0;
    
    &:hover {
      opacity: 1;
    }
  }
  
  form {
    padding: 0;
    
    input {
      width: 100%;
    }
  }
`;

export const Info = styled.div`
  margin-bottom: 6px;
  cursor: pointer;
  
  span:nth-of-type(1) {
    margin-right: 6px;
    font-weight: bold;
  }
  
  span:nth-of-type(2) {
    opacity: 0.3;
  }
`;

export const Text = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const ReplyWrapper = styled.div`
  
`;

export const ReplyMoreButton = styled.div`
  button {
    width: 100%;
    padding: 20px;
    border-radius: 4px;
    background: none;
    text-align: left;
    
    &:hover {
      span {
        opacity: 1;
      }
    }
    
    span {
      opacity: 0.5;
    }
  }
`;

