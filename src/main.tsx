import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './core/App.tsx'

import { makeServer } from './server'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

makeServer()
