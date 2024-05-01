import { cleanup, render, screen } from '@testing-library/react';
// toBeIntheDocument 등 not a function뜨면 jest-dom import하면 사용 가능함...
// import '@testing-library/jest-dom';

import App from './App';

afterEach(() => {
  cleanup();
});

describe('App.tsx', () => {
  it('App.tsx 테스트 코드', () => {
    render(<App />);

    expect(screen.getByText('PomPomHome')).toBeInTheDocument();
  });
});
