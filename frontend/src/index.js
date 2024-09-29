import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/layout';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import InvalidUserSignin from './pages/invalidUser';
import ProtectedLayout from './layouts/protectedlayout';
import Dashboard from './pages/dashboard';
import InvalidUserSignup from './pages/userExists';

const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    children: [
      {path: '/',element: <App/>},
      {path: '/sign-in',element: <SignInPage/>},
      {path: '/sign-in/*',element: <InvalidUserSignin/>},
      {path: '/sign-up',element: <SignUpPage/>},
      {path: '/sign-up/*',element: <InvalidUserSignup/>},
      {
        element: <ProtectedLayout/>,
        path: 'dashboard',
        children: [
          {path: '/dashboard',element: <Dashboard/>}
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
