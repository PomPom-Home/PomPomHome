import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// #20240423.syjang, styled-reset이라는 패키지를 사용하여 reset 설정
const GlobalStyles = createGlobalStyle` 
  ${reset} 

  * {
    box-sizing: border-box;
  }

  // App.tsx에서 ThemeProvider 내부에 GlobalStyles을 선언했기에, 다음과 같이 테마 가져다 쓸 수 있음.
  body {
    margin:0;
    padding:0;
    font-family: 'Noto Sans KR', sans-serif;
    //background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    background-image: url(${props => props.theme.bgImage});
    background-size: cover;
  }
`;

export default GlobalStyles;
