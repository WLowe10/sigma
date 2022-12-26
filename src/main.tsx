import React from 'react'
import ReactDOM from 'react-dom/client'
import { Root } from './root'

import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";

import "reset-css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
