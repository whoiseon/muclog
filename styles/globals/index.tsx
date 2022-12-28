import { Global, Theme } from "@emotion/react";
import { css } from "@emotion/react";

import {$BORDER_RADIUS, $COLOR_MAIN, $COLOR_MAIN_CLICK, $COLOR_MAIN_HOVER, $COLOR_WHITE} from "styles/variables";

const global = (theme: Theme) => css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  
  * {
    box-sizing: border-box
  }
  
  html {
    font-size: 14px;
    font-weight: 500;
    overflow-y: scroll;
    height: 100%;
  }
  
  body, input, button, textarea, select {
    font-family: "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif;
    font-size: 14px;
  }
  
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: ${theme.mode.background};
    color: ${theme.mode.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
  }
  
  #__next {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  
  html, h1, h2, h3, h4, h5, h6, form, fieldset, img, input, button, select {
    margin: 0;
    padding: 0
  }
  
  ul,li,ol,dl,dd,dt {
    list-style: none;
    padding: 0;
    margin: 0
  }
  
  label, input, button, select, img {
    vertical-align: middle;
  }
  
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  
  legend {
    position: absolute;
    margin: 0;
    padding: 0;
    font-size: 0;
    line-height: 0;
    overflow: hidden;
  }
  
  button[name="icon"] {
    background-color: inherit;

    &:hover {
      background-color: inherit;
    }

    &:active {
      background-color: inherit;
    }
  } 
  
  button[name="github"], button[name="google"] {
    background-color: ${theme.mode.whiteButtonBackground};
    border: ${theme.mode.whiteButtonBorder};
    
    &:hover {
      background-color: ${theme.mode.whiteButtonHover};
    }
    
    &:active {
      background-color: ${theme.mode.whiteButtonBackground}
    }
  }
  
  button {
    border: 0;
    border-radius: ${$BORDER_RADIUS};
    color: ${$COLOR_WHITE};
    background-color: ${$COLOR_MAIN};
    font-weight: bold;
    cursor: pointer;
    transition: all .16s ease;
    
    &:hover {
      color: ${$COLOR_WHITE};
      background-color: ${$COLOR_MAIN_HOVER};
    }
    
    &:active {
      background-color: ${$COLOR_MAIN_CLICK};
    }
  }
  
  p {
    margin: 0;
    padding: 0;
    word-break: break-all
  }
  
  hr {
    display: none
  }
  
  a, a:link {
    color: ${theme.mode.text};
    text-decoration: none
  }
  
  input:-webkit-autofill {
    -webkit-box-shadow:0 0 0px 1000px #ffffff75 inset;
  }
  
  input, textarea {
    background-color: ${theme.mode.inputBackground};
    color: ${theme.mode.inputColor};
    border-radius: ${$BORDER_RADIUS};
    font-weight: 500;
  }
  
  input::placeholder {
    color: ${theme.mode.inputPlaceHolderColor};
  }
  
  input, select, textarea {
    border: none;
  }
  
  input:focus, textarea:focus {
    outline: none;
  }
  
  textarea {
    resize: none;
    border-bottom: ${theme.mode.mobileMenuHeaderBorder};
  }
  
  header[data-layout="global-header"] {
    background-color: ${theme.mode.headerBackground};
    border-bottom: ${theme.mode.headerBorder}
  }
  
  div[data-layout="mobile-menu"] {
    background-color: ${theme.mode.mobileMenuBackground};
  }
  
  h1[data-layout="mobile-menu-header"] {
    background-color: ${theme.mode.mobileMenuHeaderBackground};
    border-bottom: ${theme.mode.mobileMenuHeaderBorder};
  }
  
  ul[data-layout="mobile-menu-ul"] {
    background-color: ${theme.mode.mobileMenuUlBackground};
  }
  
  div[data-layout="logs"] {
    background-color: ${theme.mode.cardBackground};
    border-top: ${theme.mode.cardBorder};
    border-bottom: ${theme.mode.cardBorder};
  }
  
  div[data-layout="smallModal"] {
    background-color: ${theme.mode.smallModalBackground};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    
    ul {
      li {
        button {
          span {
            color: ${theme.mode.smallModalColor}
          }
        }
      }
    }
  }
`;

const GlobalStyle = () => {
  return (
    <>
      <Global styles={global} />
    </>
  )
}

export default GlobalStyle;

