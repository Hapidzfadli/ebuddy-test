import React, { ReactNode } from 'react';
import { Container, Box } from '@mui/material';
import Header from '../organisms/Header';

interface DashboardTemplateProps {
  children: ReactNode;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default DashboardTemplate;