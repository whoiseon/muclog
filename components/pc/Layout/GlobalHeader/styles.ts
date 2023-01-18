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

export const Logo = styled.div`
  display: flex;
  padding: 0 18px;
  align-items: center;
  z-index: 1;
`;

export const Search = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 0;

  button {
    position: relative;
    width: 660px;
    padding: 12px 16px;
    cursor: text;
    text-align: left;

    img {
      margin-right: 12px;
    }

    span {
      font-weight: bold;
    }
  }
`;

export const Profile = styled.div`
  padding: 0 18px;
  margin-left: auto;
  z-index: 1;
  
  button {
    background: none;
  }

  button:nth-of-type(1) {
    margin-right: 10px;
    width: 36px;
    height: 36px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }
`;
