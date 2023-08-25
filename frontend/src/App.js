import { cloneElement, isValidElement, Children } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import {
  JobDetailPage,
  JobsPage,
  LoginPage,
  Page404
} from './pages';

import { Layout } from './layouts';
import { AuthService } from './services';

const ProtectedRoutes = (props) => {
  const page = window.location.pathname.split('/')
  const user = AuthService.getCurrentUser();
  
  if (!user && page[1] !== 'login') {
    return <Navigate to='/login' />
  }

  const children = Children.map(props.children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, { user: user, page: page });
    }
    return child;
  })
  return children;
}

function App() {
  return (
    useRoutes([
      {
        path: '/',
        element: <ProtectedRoutes><Layout /></ProtectedRoutes>,
        children: [
          { path: '/', element: <Navigate to={'/login'} /> },
          { path: 'login', element: <LoginPage /> },
          { path: 'jobs', element: <JobsPage /> },
          { path: 'job/:id', element: <JobDetailPage /> },
          { path: '*', element: <Page404 /> },
        ]
      }
    ])
  );
}

export default App;