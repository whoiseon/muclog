import styled from "@emotion/styled";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(9, 9, 9, 0.9);
  backdrop-filter: blur(10px);
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  text-align: right;
  
  button {
    background: none;
    padding: 40px;
    opacity: 0.5;
    
    &:hover {
      opacity: 1;
    }
  }
`;

export const Wrapper = styled.div`
  
`;

export const LogInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 40px 0;
`;

export const Profile = styled.div`
  margin-right: 12px;
  
  img {
    border-radius: 50%;
  }
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

export const Content = styled.div`
  padding: 40px;
  line-height: 24px;
`;

export const Attachment = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  
  img {
    width: 100%;
    object-fit: contain;
  }
`;
