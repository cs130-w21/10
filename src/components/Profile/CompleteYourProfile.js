import React from 'react';
import { useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import EditProfileForm from './EditProfileForm';

const CompleteYourProfile = () => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  return (
    <Paper>
      <EditProfileForm onSuccessRedirectURL={from.pathname} />
    </Paper>
  );
};

export default CompleteYourProfile;
