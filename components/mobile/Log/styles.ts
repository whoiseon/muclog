import styled from "@emotion/styled";

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
`;

export const Info = styled.div`
  
`;

export const UserName = styled.div`
  margin-bottom: 2px;
  
  p {
    font-weight: bold;
  }
`;

export const CreatedAt = styled.div`
  p {
    opacity: 0.3;
  }
`;

export const Content = styled.p`
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
