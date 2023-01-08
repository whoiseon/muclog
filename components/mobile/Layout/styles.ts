import styled from "@emotion/styled";
import {$BACKGROUND_COLOR_MEDIUM_BLACK} from "styles/variables";

export const Main = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 60px;
`;

export const MenuModal = styled.div<{ menuActive: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: ${({ menuActive }) => menuActive ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.2s ease-in;
  z-index: 999;
`;

export const SearchModal = styled.div<{ searchActive: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: ${({ searchActive }) => searchActive ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.2s ease-in;
  z-index: 999;
`;
