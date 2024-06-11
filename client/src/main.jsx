import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Browse from './pages/Browse.jsx';
import Contact from './pages/Contact.jsx';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Upload from './pages/Upload';  // Import the Upload component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,  // Note the correct prop is `errorElement` not `error`
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/home',
        element: <Home />
      }, {
        path: '/browse',
        element: <Browse />
      },
      {
        path: '/contact',
        element: <Contact />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/success',
        element: <Success />
      }, {
        path: '/orderHistory',
        element: <OrderHistory />
      }, {
        path: '/products/:id',
        element: <Detail />
      }, {
        path: '/upload',  // Add a new route for the upload page
        element: <Upload />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
