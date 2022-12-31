import styled from "@emotion/styled";
import {$COLOR_GRAY} from "styles/variables";

export const SkeletonProfile = styled.div`
  overflow: hidden;
  position: relative;
  background-color: ${$COLOR_GRAY};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  opacity: 0.1;
`;

export const SkeletonNickname = styled.div`
  overflow: hidden;
  position: relative;
  background-color: ${$COLOR_GRAY};
  width: 80px;
  height: 20px;
  border-radius: 4px;
  opacity: 0.1;
`;

export const SkeletonDate = styled.div`
  overflow: hidden;
  position: relative;
  background-color: ${$COLOR_GRAY};
  width: 40px;
  height: 20px;
  border-radius: 4px;
  opacity: 0.1;
`;

export const SkeletonContent = styled.div`
  overflow: hidden;
  position: relative;
  background-color: ${$COLOR_GRAY};
  width: 100%;
  height: 100px;
  border-radius: 4px;
  opacity: 0.1;
`;
