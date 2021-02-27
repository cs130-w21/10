import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import EditProfileForm from '../EditProfileForm';


const EditProfilePopup = ({ isOpen, onDismiss }) => {
  // Every time modal dialog opens/closes, reset the form value state.
  // useEffect(() => {
    // resetFormValues();
  // }, [resetFormValues, isOpen]);

  return (
    <>
    <Dialog
      open={isOpen}
      onClose={onDismiss}
    >
      <EditProfileForm onCancel={onDismiss} />
    </Dialog>
    </>
  );
};

export default EditProfilePopup;
