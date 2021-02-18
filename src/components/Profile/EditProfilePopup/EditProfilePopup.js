import React, { useState, useEffect, useCallback } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { useAuth } from '../../../services/AuthContext';

const EditProfilePopup = ({ isOpen, onDismiss }) => {
  const { userData, updateUserData } = useAuth();

  const [personalInfo, setPersonalInfo] = useState({});
  const [contactInfo, setContactInfo] = useState({});

  const resetFormValues = useCallback(() => {
    setPersonalInfo(userData.personalInfo);
    setContactInfo(userData.contactInfo);
  }, [userData]);

  useEffect(() => {
    resetFormValues();
  }, [resetFormValues, isOpen]);
  
  const handlePersonalInfoChange = (field) => (e) => {
    setPersonalInfo({ ...personalInfo, [field]: e.target.value });
  };

  const handleContactInfoChange = (field) => (e) => {
    setContactInfo({ ...contactInfo, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData({
      ...userData,
      personalInfo,
      contactInfo,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onDismiss}
    >
      <DialogTitle>Edit Your Profile</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={personalInfo.name}
            onChange={handlePersonalInfoChange('name')}
          />
          <TextField
            label="Education"
            value={personalInfo.education}
            onChange={handlePersonalInfoChange('education')}
          />
          <TextField
            label="Work"
            value={personalInfo.work}
            onChange={handlePersonalInfoChange('work')}
          />
          <TextField
            label="LinkedIn"
            value={contactInfo.linkedin}
            onChange={handleContactInfoChange('linkedin')}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={e => resetFormValues()}> Reset </Button>
        <Button color="primary" onClick={e => onDismiss()}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfilePopup;
