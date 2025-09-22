import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
  }

  body {
    line-height: 1.5;
    font-size: 1.8rem;
    font-family: var(--font-family);
    font-weight: 400;
    overflow-x: hidden;
    background: var(--bg);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  button {
    border: 0.1rem solid transparent;
    outline: none;
  }

  input:not([type="radio"]),
  textarea {
    border: 0.1rem solid;
    outline: none;
  }


  input:focus,
  button:focus {
    outline: none;
  }

  button,
  label,
  input,
  select {
    font-family: inherit;
    font-size: 100%;
  }

  /*
    Create a root stacking context
  */
  #root,
  #__next {
    isolation: isolate;
  }

  /* headings */
  h1 {
    font-size: 3.418rem;
    letter-spacing: -0.022em;
  }

  h2 {
    font-size: 2.734rem;
    letter-spacing: -0.021em;
  }

  h3 {
    font-size: 2.188rem;
    letter-spacing: -0.021em;
  }

  h4 {
    font-size: 1.75rem;
    letter-spacing: -0.017em;
  }

  h5 {
    font-size: 1.4rem;
    letter-spacing: -0.011em;
  }

  h6 {
    font-size: 1.12rem;
    letter-spacing: -0.006em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    color: var(--black-1);
  }

  ul {
    list-style: none;
  }

  img,
  svg {
    max-width: 100%;
  }

  .blurred-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(25px);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

body.modal-open {
  overflow: hidden;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
`;
