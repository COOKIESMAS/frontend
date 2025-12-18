import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'IM_Hyemin';
    src:
      url('/fonts/IM_Hyemin-Regular.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'IM_Hyemin';
    src:
      url('/fonts/IM_Hyemin-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: bold;
    font-display: swap;
  }
  @font-face {
  font-family: 'Galmuri14';
  src: url('/fonts/Galmuri14.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  }
  @font-face {
  font-family: 'DNFBitBitv2';
  src: url('/fonts/DNFBitBitv2.otf') format('otf');
  }
  

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`

export default GlobalStyle
