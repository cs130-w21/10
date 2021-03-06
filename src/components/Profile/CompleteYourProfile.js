import React from 'react';
import { useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import EditProfileForm from './EditProfileForm';

const CompleteYourProfile = () => {
  const location = useLocation();

  return (
    <Paper>
      <EditProfileForm onSuccessRedirectURL={location.state.location} />
    </Paper>
  );
};

export default CompleteYourProfile;
