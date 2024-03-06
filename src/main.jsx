import React from 'react'
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
    element: <Inscription/>
  },
  {
    element: <Index/>,
    children: [
      {
        path: '/accueil',
        element: <Accueil/>
      },
      {
        path: '/page-content',
        element: <Page_Content/>
      },
      {
        path: '/responsable',
        element: <Responsable />
      },
      {
        path: '/entraide',
        element: <Entraide/>
      },
      {
        path: '/information',
        element: <Information/>
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
