import styled from "@emotion/styled";

export const Wrapper = styled.div`

`;

export const MyBackground = styled.div`
  width: 100%;
  height: 146px;
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
  }
`;

export const MyName = styled.div`
  margin-top: 43px;

  p:nth-of-type(1) {
    font-weight: bold;
    margin-bottom: 6px;
  }
  
  p:nth-of-type(2) {
    opacity: 0.5;
  }
`;
