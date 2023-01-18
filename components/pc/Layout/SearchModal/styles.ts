import styled from "@emotion/styled";

export const Background = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 9px;
  z-index: 999;
`;

export const Wrapper = styled.div`
  width: 660px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
`;

export const Input = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    padding: 12px 16px 12px 42px;
  }
  
  img {
    position: absolute;
    top: 14px;
    left: 16px;
  }
`;

export const UserList = styled.div`
  padding: 12px 0;
`;

export const EmptyUser = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 40px 0;
  
  h1 {
    font-size: 18px;
    opacity: 0.3;
    font-weight: 500;
  }
`;
