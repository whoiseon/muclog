import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  padding: 12px 20px;
`;

export const Profile = styled.div`
  margin-right: 12px;
  
  img {
    border-radius: 50%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Info = styled.div`
  margin-bottom: 6px;
  
  span:nth-of-type(1) {
    margin-right: 6px;
    font-weight: bold;
  }
  
  span:nth-of-type(2) {
    opacity: 0.3;
  }
`;

export const Text = styled.div`
  
`;
