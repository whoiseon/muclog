import styled from "@emotion/styled";

export const Wrapper = styled.div`
  position: relative;

  & > form {
    display: flex;
    padding-left: 44px;
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

export const CommentWrapper = styled.div`
  display: flex;
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
`;

export const EditForm = styled.form`
  width: 100%;
  
  input {
    padding: 16px 12px;
    width: 100%;
  }
  
  div {
    display: flex;
    align-items: center;
    margin-top: 16px;
    
    button {
      width: 50%;
      padding: 8px;
    }

    button:nth-of-type(1) {
      margin-right: 10px;
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
  position: relative;
  display: flex;
  cursor: pointer;
`;

export const ReplyWrapper = styled.div`
  position: relative;
  padding-left: 44px;
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

export const MoreButton = styled.div`

`;

