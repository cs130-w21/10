import React from 'react';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// warnings is an array of warning objects.
// Each warning object should have a `primaryMessage` and can also have a `secondaryMessage`
const EditProfileRedirectAlert = ({ warnings }) => {
  const renderWarningList = () => {
    return warnings.map((warning) => (
      <ListItem>
        <ListItemText
          primary={warning.primaryMessage}
          secondary={warning.secondaryMessage ? warning.secondaryMessage : null}
        />
      </ListItem>
    ));
  };

  if (!warnings) {
    return null;
  }

  return (
    <Alert severity="warning">
      <AlertTitle>Redirect Warning</AlertTitle>
      <List dense={true}>
        {renderWarningList()}
      </List>
    </Alert>
  );
};

export default EditProfileRedirectAlert;
