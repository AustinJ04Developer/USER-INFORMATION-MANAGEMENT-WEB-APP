import React from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Main } from './layout/Main';

export const MainLayout: React.FC = () => {
  return (
    <div>
      {/* Header Layout */}
      <Header />
      {/* Content Layout */}
      <Main/>
      {/* Footer Layout */}
      <Footer />
    </div>
  );
};
