import React, { useState, useEffect, useCallback } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { useAuth } from '../../../services/AuthContext';
import { db, storage, getCurrentUser } from '../../../services/firebase';

const EditProfilePopup = ({ isOpen, onDismiss }) => {
  const { userData, updateUserData } = useAuth();

  // State for list of interests
  // TODO: Could write new interests to DB when user inputs something new?
  const [interestsOptions, setInterestsOptions] = useState([]);

  // State related to form values
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [userInterests, setUserInterests] = useState([]);
  const [userExpertises, setUserExpertises] = useState([]);

  const resetFormValues = useCallback(() => {
    setPersonalInfo(userData.personalInfo);
    setContactInfo(userData.contactInfo);
    setUserInterests(userData.interests ? userData.interests : []);
    setUserExpertises(userData.expertises ? userData.expertises : []);
  }, [userData]);

  // Every time modal dialog opens/closes, reset the form value state.
  useEffect(() => {
    resetFormValues();
  }, [resetFormValues, isOpen]);

  // Get list of interests from db
  useEffect(() => {
    // Since our interests list isn't getting updated for now, we can just make the query once
    db.ref('interests/').once('value', (snapshot) => {
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

  // TODO: Put an alert after write to DB?
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData({
      ...userData,
      personalInfo,
      contactInfo,
      interests: userInterests,
      expertises: userExpertises,
    });
  };

  // Upload image to storage
  const handleImageUpload = (e) => {
    // Avoid crashing app if user clicks upload image without attaching a file
    if (profilePicFile !== null) {
      const imageRef = storage.ref().child(`images/${getCurrentUser().uid}/${profilePicFile.name}`);
      imageRef.put(profilePicFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File uploaded to: ', downloadURL);
          // Upload pic URL to DB
          updateUserData({
            ...userData,
            personalInfo: {
              ...personalInfo,
              profilePicture: downloadURL,
            },
          });
          // Also set profilePicFile to null again after upload done to avoid crash as well
          setProfilePicFile(null);
        });
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onDismiss}
    >
      <DialogTitle>Edit Your Profile</DialogTitle>
      <DialogContent>
        <Avatar
          alt={`${personalInfo.name}'s Avatar`}
          src={personalInfo.profilePicture ? personalInfo.profilePicture : '/placeholder.jpg'}
        />
        <input type="file" onChange={(e) => setProfilePicFile(e.target.files[0])} />
        <Button color="primary" onClick={handleImageUpload}>Upload Image</Button>
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
          <Autocomplete
            multiple
            options={interestsOptions}
            freeSolo
            value={userExpertises}
            onChange={(e, newValue) => setUserExpertises(newValue)}
            renderTags={(expertises, getTagProps) =>
              expertises.map((expertise, index) => (
                <Chip variant="outlined" label={expertise} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params} variant="outlined"
                label="Areas of Expertise" placeholder="Areas of Expertise"
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
