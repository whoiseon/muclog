import { css } from "@emotion/react";

const global = (theme: any) => css`
  * {
    box-sizing: border-box
  }
  html {
    font-size: 14px;
    font-weight: 500;
    overflow-y: scroll
  }
  
  body, input, button, textarea, select {
    font-family: "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif;
    font-size: 14px;
  }
  
  body {
    margin: 0;
    padding: 0;
    height: auto;
    background-color: ${theme.mode.background};
    color: ${theme.mode.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
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
  
  button {
    border: 0;
    color: ${theme.mode.buttonText};
    background-color: ${theme.mode.buttonBg};
    cursor: pointer;
    
    &:hover {
      color: ${theme.mode.buttonText};
      background-color: ${theme.mode.buttonBgHover};
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
    color: #000;
    text-decoration: none
  }
  
  a:hover {
    text-decoration: underline;
    color: #4d0585
  }
  
  a:focus, a:active {
    color:#000;
    text-decoration:none
  }
  
  input:-webkit-autofill {
    -webkit-box-shadow:0 0 0px 1000px #ffffff75 inset;
  }
  
  input, select, textarea {
    background: #fff;
    color: #222;
  }
`;

export default global;

