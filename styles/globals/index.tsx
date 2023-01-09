import { Global, Theme } from "@emotion/react";
import { css } from "@emotion/react";

import {
  $BORDER_RADIUS,
  $COLOR_MAIN,
  $COLOR_MAIN_CLICK,
  $COLOR_MAIN_HOVER,
  $COLOR_RED, $COLOR_RED_CLICK, $COLOR_RED_HOVER,
  $COLOR_WHITE
} from "styles/variables";

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
  
  button[data-button="red"] {
    border: 0;
    border-radius: ${$BORDER_RADIUS};
    color: ${$COLOR_WHITE};
    background-color: ${$COLOR_RED};
    font-weight: bold;
    cursor: pointer;
    transition: all .16s ease;
    
    &:hover {
      color: ${$COLOR_WHITE};
      background-color: ${$COLOR_RED_HOVER};
    }
    
    &:active {
      background-color: ${$COLOR_RED_CLICK};
    }
  }
  
  button[data-button="border"] {
    border: ${theme.mode.globalModalButtonBorder};
    border-radius: ${$BORDER_RADIUS};
    color: ${theme.mode.globalModalColor};
    background: none;
    font-weight: bold;
    cursor: pointer;
    transition: all .16s ease;
    
    &:hover {
      color: ${theme.mode.globalModalColor};
      background-color: ${theme.mode.globalModalButtonHover};
    }
    
    &:active {
      background: none;
    }
  }
  
  button[name="Github"], button[name="Google"] {
    background-color: ${theme.mode.whiteButtonBackground};
    border: ${theme.mode.whiteButtonBorder};
    
    &:hover {
      background-color: ${theme.mode.whiteButtonHover};
    }
    
    &:active {
      background-color: ${theme.mode.whiteButtonBackground}
    }
  }
  
  button[data-layout="writeButton"] {
    display: flex;
    align-items: center;
    background-color: ${theme.mode.inputBackground};
    color: ${theme.mode.inputColor};
    font-weight: 500;
    padding: 20px;
    cursor: text;
    
    &:hover {
      background-color: ${theme.mode.inputBackground};
      color: ${theme.mode.inputColor};
    }
    
    span {
      opacity: 0.5;
    }
    
    & > div {
      margin-right: 20px;
    }
  }
  
  button[data-layout="profile-photo-change-button"] {
    border: 4px solid ${theme.mode.mobileMenuHeaderBackground};
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
  
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  
  input:-webkit-autofill {
    -webkit-box-shadow:0 0 0 1000px #ffffff75 inset;
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
  
  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  
  textarea {
    resize: none;
    border-bottom: ${theme.mode.mobileMenuHeaderBorder};
  }
  
  textarea[data-layout="editTextarea"] {
    background-color: ${theme.mode.editTextareaBackground};
    border: none;
  }
  
  header[data-layout="global-header"] {
    background-color: ${theme.mode.headerBackground};
    border-bottom: ${theme.mode.headerBorder}
  }
  
  div[data-layout="mobile-menu"] {
    background-color: ${theme.mode.mobileMenuBackground};
  }
  
  div[data-layout="mobile-search"] {
    background-color: ${theme.mode.mobileMenuBackground};
  }
  
  div[data-layout="mobile-menu-header"] {
    background-color: ${theme.mode.mobileMenuHeaderBackground};
    border-bottom: ${theme.mode.mobileMenuHeaderBorder};
  }

  div[data-layout="mobile-menu-profile"] {
    border: 6px solid ${theme.mode.feedProfileBackground};
  }
  
  div[data-layout="mobile-feed-profile"] {
    background-color: ${theme.mode.feedProfileBackground};
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
  
  div[data-layout="globalConfirmModal"] {
    background-color: ${theme.mode.globalModalBackground};
    
    h1 {
      border-bottom: ${theme.mode.globalModalTitleBorder};
    }
  }
  
  div[data-layout="writeFormHeader"] {
    background-color: ${theme.mode.headerBackground};
  }
  
  form[data-layout="writeForm"] {
    background-color: ${theme.mode.inputBackground};
    color: ${theme.mode.inputColor};
  }
  
  div[data-layout="writeFormTools"] {
    background-color: ${theme.mode.headerBackground};
  }
  
  div[data-layout="logsTools"] {
    border-top: 1px solid ${theme.mode.background};
    
    button {
      background-color: ${theme.mode.cardBackground};
      color: ${theme.mode.text};
      font-weight: 500;
      
      &:active {
        background-color: ${theme.mode.cardBackground};
        opacity: 0.6;
      }
    }
    
    button:first-of-type {
      border-right: 1px solid ${theme.mode.background};
    }
  }
  
  div[data-layout="commentWrapper"] {
    border-top: 1px solid ${theme.mode.background};
  }
  
  form[data-layout="commentInput"] {
    border-top: 1px solid ${theme.mode.background};
  }
  
  div[data-layout="commentText"] {
    p {
      background-color: ${theme.mode.background};
      padding: 12px;
      border: ${theme.mode.cardBorder};
      border-radius: 4px;
    }
  }
  
  label[data-layout="profile-photo-picker"] {
    background-color: ${theme.mode.mobileMenuHeaderBackground};
    border-radius: 4px;
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

