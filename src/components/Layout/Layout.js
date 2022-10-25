import React from 'react';
import { Box } from '@mui/material';
import Footer from './Footer';
import Header from './Header';

function Layout({ children }) {
  return (
    <Box className="box_container">
      <Header />
      {children}
      <Footer />
    </Box>
  );
}

export default Layout;
