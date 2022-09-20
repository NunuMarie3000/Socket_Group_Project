import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './routes/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextProvider } from './SocketContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path='/home' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
