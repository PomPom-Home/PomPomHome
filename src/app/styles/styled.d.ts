// import original module declarations
import 'styled-components';

// #20240423.syjang, Theme.ts 내에서 테마 수정 시 interface DefaultTheme 변경이 필요합니다.
declare module 'styled-components' {
  export interface DefaultTheme {
    bgImage: string;
    colors: {
      bgColor: string;
      textColor: string;
      btnColor: string;
    };
    shadows: {
      widget: string;
      setting: string;
    };
  }
}
