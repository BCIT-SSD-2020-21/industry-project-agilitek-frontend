import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider
      domain="agilitek.us.auth0.com"
      clientId="Pn08OIuU2lNszAFLD4WZlelkOIdhwmVu"
      redirectUri="http://localhost:3000/"
    >
      <App />
    </Auth0Provider>,
    document.getElementById("root")
  );