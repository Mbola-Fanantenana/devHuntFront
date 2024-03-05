import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentification from './pages/Authentification.jsx';
import Inscription from './pages/Inscription.jsx';
import Accueil from './pages/Accueil.jsx';

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
    path: '/accueil',
    element: <Accueil/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
