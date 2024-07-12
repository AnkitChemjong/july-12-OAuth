import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Auth from './context/Auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth>
    <App />
  </Auth>,
)
