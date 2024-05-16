import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import { theme } from '../styles/Theme';
import BrowserRouter from './RouterProvider';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter />
        {/* #20240423.syjang, 이 부분에 메인 컴포넌트 추가 필요 */}
      </ThemeProvider>
    </>
  );
};
export default App;
