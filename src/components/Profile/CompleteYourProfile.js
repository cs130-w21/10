import React from 'react';
import Paper from '@material-ui/core/Paper';

import EditProfileForm from './EditProfileForm';

const CompleteYourProfile = () => {
  return (
    <Paper>
      <EditProfileForm onCancel={() => {}}/>
    </Paper>
  );
};

export default CompleteYourProfile;
