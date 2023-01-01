import styled from "@emotion/styled";

export const Form = styled.form`
  width: 100%;
  height: 100%;
  cursor: text;
`;

export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  cursor: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  cursor: pointer;
  background: none;
  opacity: 50%;
  transition: opacity 0.16s ease;
  
  &:hover {
    opacity: 100%;
    background: none;
  }
`;

export const Title = styled.h1`
  font-size: 14px;
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 21px;
  z-index: 1;
`;

export const SubmitButton = styled.button`
  position: absolute;
  top: 14px;
  right: 10px;
  padding: 8px 14px;
`;

export const Textarea = styled.div`
  padding-top: 60px;
  
  textarea {
    width: 100%;
    padding: 20px;
    border: none;
  }
`;

export const WriteTools = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  cursor: auto;
  border-radius: 18px 18px 0 0;
  box-shadow: 0 -3px 16px rgba(0, 0, 0, 0.06);
  
  ul {
    padding-bottom: 20px;
  }
`;

export const PictureBox = styled.div`
  label {
    display: flex;
    align-items: center;
    padding: 30px;
    width: 100%;
    cursor: pointer;
    background: none;
    border-radius: 18px 18px 0 0;
    transition: all 0.16s ease;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    
    & > div {
      margin-right: 20px;
    }
    
    span {
      opacity: 0.5;
    }
  }
`;
