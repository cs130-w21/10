import React, { useState, useEffect, useCallback } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Avatar,
  Button,
  Chip,
  Input,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../../services/AuthContext';
import { db, storage, getCurrentUser } from '../../../services/firebase';

const useStyles = makeStyles((theme) => ({
  profilePic: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    overflow: "hidden",
    marginBottom: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  textField: {
    width: "100%"
  },
  dlog: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }, 
  leftB: {
    float: "left"
  },
  rightB: {
    float: "right"
  }
}));

const EditProfilePopup = ({ isOpen, onDismiss }) => {
  const { userData, updateUserData } = useAuth();
  const classes = useStyles();

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
    <>
    <Dialog
      open={isOpen}
      onClose={onDismiss}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>Edit Your Profile</DialogTitle>
      <DialogContent className={classes.dlog}>
        <Avatar
          alt={`${personalInfo.name}'s Avatar`}
          className={classes.profilePic}
          src={personalInfo.profilePicture ? personalInfo.profilePicture : '/placeholder.jpg'}
        />

        <Box >
          <label htmlFor="upload-photo" style={{ marginLeft: '0px'}}>
            <input 
              type="file" 
              id="upload-photo" 
              style={{ display: 'none'}}
              name="upload-photo"
              onChange={(e) => setProfilePicFile(e.target.files[0])} />
              <Button className={classes.leftB} color="primary" variant="contained" component="span">
                Select Image
              </Button>
          </label>
          <Button  className={classes.rightB} color="primary" style={{ marginRight: '0px'}} onClick={handleImageUpload}>
            Upload Image
          </Button>
        </Box>
        <br />
        <br />
        <br />

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={personalInfo.name}
            className={classes.textField}
            onChange={handlePersonalInfoChange('name')}
          />
          <br />
          <br />
          <TextField
            label="Education"
            className={classes.textField}
            value={personalInfo.education}
            onChange={handlePersonalInfoChange('education')}
          />
          <br />
          <br />
          <TextField
            label="Work"
            className={classes.textField}
            value={personalInfo.work}
            onChange={handlePersonalInfoChange('work')}
          />
          <br />
          <br />
          <TextField
            label="LinkedIn"
            className={classes.textField}
            value={contactInfo.linkedin}
            onChange={handleContactInfoChange('linkedin')}
          />
          <br />
          <br />
          <br />
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
                label="Interests" 
              />
            )}
          />
          <br />
          <br />
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
                label="Areas of Expertise" 
              />
            )}
          />
          <br /> 
          <br />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={e => resetFormValues()}> Reset </Button>
        <Button color="primary" onClick={e => onDismiss()}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default EditProfilePopup;
