import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html{
    font-size: 62.5%;
  }
  *{
    outline:0;
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  body{
    background-color:#fff;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }
  button{
    cursor: pointer;
    border:0;
    background: transparent;
  }
`;
