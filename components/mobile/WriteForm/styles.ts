import styled from "@emotion/styled";

export const Form = styled.form`

`;

export const Editor = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  textarea {
    display: block;
    width: 100%;
    all: unset;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    border-radius: 0;
  }
  
  button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    padding: 20px;
    opacity: 0.5;
    
    &:hover {
      opacity: 1;
    }
  }
`;
