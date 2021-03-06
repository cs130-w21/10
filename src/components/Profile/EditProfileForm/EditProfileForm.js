import React from 'react';
import { Redirect } from 'react-router-dom';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import useEditProfileForm from './useEditProfileForm';

const useStyles = makeStyles((theme) => ({
  profilePic: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    overflow: "hidden",
    marginBottom: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  dlog: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }, 
}));

// `onSuccessRedirectURL` prop is a URL string that tells us
//  where to redirect to after saving.
// `onCancel` prop is a callback that should get executed
//  when the user presses the Cancel button.
// Currently `onSuccessRedirectURL` is used by CompleteYourProfile page whereas `onCancel` is used by EditProfilePopup
const EditProfileForm = ({ onSuccessRedirectURL, onCancel }) => {
  const classes = useStyles();

  const {
    interestsOptions,
    setProfilePicFile,
    personalInfo, updatePersonalInfo,
    contactInfo, updateContactInfo,
    userInterests, setUserInterests,
    userExpertises, setUserExpertises,
    resetFormValues, submitFormValues,
    uploadImage,
    errors,
  } = useEditProfileForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = submitFormValues();
    if (result && onCancel) {
      onCancel();
    } else if (result && onSuccessRedirectURL) {
      return (
        <Redirect to={onSuccessRedirectURL} />
      );
    }
  };

  return (
    <Grid container className={classes.dlog}>
      <Grid item xs={12}>
        <h1>Edit Your Profile</h1>
      </Grid>
      <Grid item container xs={4}>
        <Grid item xs={12}>
          <Avatar
            alt={`${personalInfo.name}'s Avatar`}
            className={classes.profilePic}
            src={personalInfo.profilePicture ? personalInfo.profilePicture : '/placeholder.jpg'}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicFile(e.target.files[0])}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => uploadImage()}>Upload Image</Button>
        </Grid>
      </Grid>
      <Grid item container xs={8}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <TextField
              error={errors.name ? true : false}
              helperText={errors.name || ''}
              label="Name"
              value={personalInfo.name ? personalInfo.name : ''}
              onChange={(e) => updatePersonalInfo('name')(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <h4>Education</h4>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={4}>
              <TextField
                label="School"
                value={personalInfo.education.school ? personalInfo.education.school : ''}
                onChange={(e) => updatePersonalInfo('education', 'school')(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Major"
                value={personalInfo.education.major ? personalInfo.education.major : ''}
                onChange={(e) => updatePersonalInfo('education', 'major')(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Graduation Year"
                type="number"
                value={personalInfo.education.gradYear ? personalInfo.education.gradYear : 0}
                onChange={(e) => updatePersonalInfo('education', 'gradYear')(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h4>Work</h4>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Company"
                fullWidth
                value={personalInfo.work.company ? personalInfo.work.company : ''}
                onChange={(e) => updatePersonalInfo('work', 'company')(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Position"
                fullWidth
                value={personalInfo.work.position ? personalInfo.work.position : ''}
                onChange={(e) => updatePersonalInfo('work', 'position')(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Work Description"
                multiline
                fullWidth
                rows={2}
                rowsMax={5}
                value={personalInfo.work.description ? personalInfo.work.description : ''}
                onChange={(e) => updatePersonalInfo('work', 'description')(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Personal Bio"
              multiline
              fullWidth
              rows={2}
              rowsMax={5}
              value={personalInfo.bio ? personalInfo.bio : ''}
              onChange={(e) => updatePersonalInfo('bio')(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="LinkedIn"
              value={contactInfo.linkedin}
              onChange={(e) => updateContactInfo('linkedin')(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
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
                  error={errors.interests ? true : false}
                  helperText={errors.interests || ''}
                  label="Interests" placeholder="Interests"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
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
                  error={errors.expertises ? true : false}
                  helperText={errors.expertises || ''}
                  label="Areas of Expertise" placeholder="Areas of Expertise"
                />
              )}
            />
          </Grid>
        </form>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            component="span"
            onClick={e => resetFormValues()}>Reset</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={e => { if (onCancel) { onCancel(); }}}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}>Save</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProfileForm;
