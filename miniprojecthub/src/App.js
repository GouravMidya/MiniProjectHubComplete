import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import AdminPage from './pages/AdminPage';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

import { ThemeProvider } from '@mui/material/styles';
import appTheme from './appTheme';


function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div style={{ flex: 1 }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      </ThemeProvider>
  );
}

export default App;