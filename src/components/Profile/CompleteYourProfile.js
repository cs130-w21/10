import React from 'react';
import { useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import EditProfileForm from './EditProfileForm';

/**
 * @class
 * @classdesc Component to render the CompleteYourProfile page. User will get redirected here if they have not completed the details in their profile
 * @prop {object} location    - Object from React Router `useLocation()`.
 *                              Used to extract the target URL that the user
 *                              should be redirected to after they finish their profile.
 */
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
