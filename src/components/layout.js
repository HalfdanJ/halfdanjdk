import React from "react";
import styled, { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Raleway', sans-serif;
    margin: 26px;
    line-height: 1.2;
    font-weight: 300;
    -webkit-font-smoothing: antialiased; 
  }

  a {
    color: #207575;
  }
  h1 {
    font-weight: 600;
  }
`;

export const Section = styled.section`
  max-width: 750px;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

export default function Layout({ children }) {
  return (
    <Main>
      <GlobalStyle />
      {children}
    </Main>
  );
}
