import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import NotFound from '../pages/NotFound/NotFound';
import Rovers from '../pages/Rovers/Rovers';

function AppRouter() {
  return (
    <Layout>
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/" element={<Rovers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default AppRouter;
