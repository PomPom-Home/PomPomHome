import { DefaultTheme } from 'styled-components';

// #20240323.syjang, 색 및 interface는 임의로 작성했습니다. 여기에 공통에서 쓰일 것들을 정의하면 됩니다.
// 예시로 작성한 것이므로, 테마 이름과 내용 모두 수정 가능하나 styled.d.ts 내의 DefaultTheme interface도 함께 수정해주셔야 합니다.
export const theme: DefaultTheme = {
  bgImage: '/src/assets/background/backGroundSample.png',
  colors: {
    bgColor: '#ffffff',
    textColor: '#000000',
    btnColor: '#c4c4c4',
  },
  shadows: {
    widget: '3px 5px 10px -10px gray',
    setting: '5px 5px 30px -15px gray',
  },
};

export default theme;
