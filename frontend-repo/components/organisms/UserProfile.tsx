import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  fetchUserStart, 
  fetchUserSuccess, 
  fetchUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  resetUserState
} from '../../store/slices/userSlice';
import { fetchUserData, updateUserData, User } from '../../apis/userApi';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userData, loading, success, error } = useSelector((state: RootState) => state.user);
  
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user?.uid) {
      handleFetchUserData();
    }
  }, [user?.uid]);

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setEmail(userData.email || '');
    }
  }, [userData]);

  // Reset success/error state after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(resetUserState());
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleFetchUserData = async () => {
    if (!user?.uid) return;
    
    try {
      dispatch(fetchUserStart());
      const data = await fetchUserData(user.uid);
      dispatch(fetchUserSuccess(data));
    } catch (error: any) {
      dispatch(fetchUserFailure(error.message || 'Failed to fetch user data'));
    }
  };

  const handleUpdateUserData = async () => {
    if (!user?.uid) return;
    
    try {
      dispatch(updateUserStart());
      
      const updatedData: Partial<User> = {
        name,
        email
      };
      
      const data = await updateUserData(user.uid, updatedData);
      dispatch(updateUserSuccess(data));
      setEditMode(false);
    } catch (error: any) {
      dispatch(updateUserFailure(error.message || 'Failed to update user data'));
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, my: 3 }}>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Operation successful!
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          User Profile
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={editMode ? handleUpdateUserData : () => setEditMode(true)}
          sx={{ mr: 1 }}
        >
          {editMode ? 'Save Changes' : 'Edit Profile'}
        </Button>
        
        {editMode && (
          <Button 
            variant="outlined" 
            onClick={() => setEditMode(false)}
          >
            Cancel
          </Button>
        )}
      </Box>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Name
            </Typography>
            {editMode ? (
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            ) : (
              <Typography variant="body1">
                {userData?.name || 'N/A'}
              </Typography>
            )}
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Email
            </Typography>
            {editMode ? (
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              />
            ) : (
              <Typography variant="body1">
                {userData?.email || 'N/A'}
              </Typography>
            )}
          </Box>
        </Grid>
        
        {userData?.totalAverageWeightRatings !== undefined && (
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Average Weight Ratings
              </Typography>
              <Typography variant="body1">
                {userData.totalAverageWeightRatings.toFixed(1)}
              </Typography>
            </Box>
          </Grid>
        )}
        
        {userData?.numberOfRents !== undefined && (
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Number of Rents
              </Typography>
              <Typography variant="body1">
                {userData.numberOfRents}
              </Typography>
            </Box>
          </Grid>
        )}
        
        {userData?.recentlyActive && (
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Last Active
              </Typography>
              <Typography variant="body1">
                {formatDate(userData.recentlyActive)}
              </Typography>
            </Box>
          </Grid>
        )}
        
        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Created At
            </Typography>
            <Typography variant="body1">
              {formatDate(userData?.createdAt)}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Updated At
            </Typography>
            <Typography variant="body1">
              {formatDate(userData?.updatedAt)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfile;