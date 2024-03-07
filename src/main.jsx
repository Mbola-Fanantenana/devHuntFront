import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentification from './pages/Authentification.jsx';
import Inscription from './pages/Inscription.jsx';
import Accueil from './pages/Accueil.jsx';
import Entraide from './pages/Entraide.jsx';
import Information from './pages/Information.jsx';
import Index from './pages/Index.jsx';
import Responsable from './pages/Responsable.jsx';
import Page_Content from './pages/Page_Content.jsx';
import Map from './pages/Map.jsx';
import Forum from './pages/Forum.jsx';
import ProfilePic from './pages/ProfilePic.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Profil from './pages/Profil.jsx'
import Message from './pages/Message.jsx'

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userSession = localStorage.getItem('userSession');

    if (location.pathname !== '/login' && (token === null || userSession === null)) {
      navigate('/login');
    }
  }, [location.pathname]);

  return element;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Authentification />
  },
  {
    path: '/sign-up',
    element: <Inscription />
  },
  {
    path: '/photo-profil',
    element: <ProfilePic />
  },
  {
    element: <ProtectedRoute element={<Index/>} />,
    children: [
      {
        path: '/accueil',
        element: <Accueil />
      },
      {
        path: '/page-content',
        element: <Page_Content />
      },
      {
        path: '/responsable',
        element: <Responsable />
      },
      {
        path: '/entraide',
        element: <Entraide />
      },
      {
        path: '/information',
        element: <Information />
      },
      {
        path: '/map',
        element: <Map />
      },
      {
        path: '/forum',
        element: <Forum />
      },
      {
        path: '/profil',
        element: <Profil />
      },

      {
        path: '/message',
        element: <Message />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
