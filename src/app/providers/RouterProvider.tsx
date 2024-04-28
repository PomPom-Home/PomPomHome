import NewTab from '../../pages/newTab/ui/NewTab';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([{ path: '*', element: <NewTab /> }]);

function BrowserRouter() {
  return <RouterProvider router={router} />;
}

export default BrowserRouter;
