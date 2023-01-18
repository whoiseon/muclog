import styled from "@emotion/styled";

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  z-index: 100;
`;

export const Search = styled.div`
  height: 100%;
  z-index: 10;
  
  button {
    width: 60px;
    height: 100%;
    opacity: 50%;

    &:hover {
      opacity: 100%;
    }
  }
`;

export const Logo = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 14px;
  z-index: 1;
`;

export const Menu = styled.div`
  height: 100%;
  z-index: 10;
  margin-left: auto;

  button {
    width: 60px;
    height: 100%;
    opacity: 50%;
    
    &:hover {
      opacity: 100%;
    }
  }
`;

export const Icon = styled.div`

`;