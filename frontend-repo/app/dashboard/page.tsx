'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import UserProfile from '../../components/organisms/UserProfile';
import { RootState } from '../../store';
import { Box } from '@mui/material';
import Typography from '../../components/atoms/Typography';

export default function DashboardPage() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardTemplate>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user?.displayName || user?.email || 'User'}! 
          Here's your profile information.
        </Typography>
      </Box>
      
      <UserProfile />
    </DashboardTemplate>
  );
}