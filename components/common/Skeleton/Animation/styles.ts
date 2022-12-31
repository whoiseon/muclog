import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

const Loading = keyframes`
  0% {
    transform: translateX(-200%);
  }
  50% {
    transform: translateX(-60%);
  }
  100% {
    transform: translate(200%);
  }
`

export const Wrapper = styled.div`
  position : absolute;
  top: 0;
  left : 0;
  width : 100%;
  height : 100%;
  animation: ${Loading} 1.6s infinite linear;
`;

export const Line = styled.div`
  width : 500px;
  height: 100%;
  background: linear-gradient(to right, transparent, #000, transparent);
  transform: skewX(-20deg);
  opacity: 0.4;
`;
