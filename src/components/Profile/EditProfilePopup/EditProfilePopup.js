import React, { useState, useEffect, useCallback } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { useAuth } from '../../../services/AuthContext';
import { db } from '../../../services/firebase';

const EditProfilePopup = ({ isOpen, onDismiss }) => {
  const { userData, updateUserData } = useAuth();

  // State for list of interests
  const [interestsOptions, setInterestsOptions] = useState([]);

  // State related to form values
  const [personalInfo, setPersonalInfo] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [userInterests, setUserInterests] = useState([]);

  const resetFormValues = useCallback(() => {
    setPersonalInfo(userData.personalInfo);
    setContactInfo(userData.contactInfo);
    setUserInterests(userData.interests ? userData.interests : []);
  }, [userData]);

  // Every time modal dialog opens/closes, reset the form value state.
  useEffect(() => {
    resetFormValues();
  }, [resetFormValues, isOpen]);

  // Get list of interests from db
  useEffect(() => {
    db.ref('interests/').on('value', (snapshot) => {
      if (snapshot !== null) {
        setInterestsOptions(snapshot.val());
      }
    });
  }, []);
  
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
      interests: userInterests,
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
          <Autocomplete
            multiple
            options={interestsOptions}
            freeSolo
            value={userInterests}
            onChange={(e, newValue) => setUserInterests(newValue)}
            renderTags={(interests, getTagProps) =>
              interests.map((interest, index) => (
                <Chip variant="outlined" label={interest} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params} variant="outlined"
                label="Interests" placeholder="Interests"
              />
            )}
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
