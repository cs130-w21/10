import React from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import useEditProfileForm from './useEditProfileForm';

const EditProfileForm = ({ onCancel }) => {
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
    if (submitFormValues() && onCancel) {
      onCancel();
    }
  };

  return (
    <>
      <h1>Edit Your Profile</h1>
      <Avatar
        alt={`${personalInfo.name}'s Avatar`}
        src={personalInfo.profilePicture ? personalInfo.profilePicture : '/placeholder.jpg'}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfilePicFile(e.target.files[0])}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => uploadImage()}>Upload Image</Button>
      <form onSubmit={handleSubmit}>
        <TextField
          error={errors.name}
          helperText={errors.name || ''}
          label="Name"
          value={personalInfo.name}
          onChange={(e) => updatePersonalInfo('name')(e.target.value)}
        />
        <FormLabel>Education</FormLabel>
        <TextField
          label="School"
          value={personalInfo.education.school ? personalInfo.education.school : ''}
          onChange={(e) => updatePersonalInfo('education', 'school')(e.target.value)}
        />
        <TextField
          label="Major"
          value={personalInfo.education.major ? personalInfo.education.major : ''}
          onChange={(e) => updatePersonalInfo('education', 'major')(e.target.value)}
        />
        <TextField
          label="Graduation Year"
          type="number"
          value={personalInfo.education.gradYear ? personalInfo.education.gradYear : 0}
          onChange={(e) => updatePersonalInfo('education', 'gradYear')(e.target.value)}
        />
        <FormLabel>Work</FormLabel>
        <TextField
          label="Company"
          value={personalInfo.work.company ? personalInfo.work.company : ''}
          onChange={(e) => updatePersonalInfo('work', 'company')(e.target.value)}
        />
        <TextField
          label="Position"
          value={personalInfo.work.position ? personalInfo.work.position : ''}
          onChange={(e) => updatePersonalInfo('work', 'position')(e.target.value)}
        />
        <TextField
          label="Work Description"
          value={personalInfo.work.description ? personalInfo.work.description : ''}
          onChange={(e) => updatePersonalInfo('work', 'description')(e.target.value)}
        />
        <TextField
          label="Personal Bio"
          value={personalInfo.bio ? personalInfo.bio : ''}
          onChange={(e) => updatePersonalInfo('bio')(e.target.value)}
        />
        <TextField
          label="LinkedIn"
          value={contactInfo.linkedin}
          onChange={(e) => updateContactInfo('linkedin')(e.target.value)}
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
              error={errors.interests}
              helperText={errors.interests || ''}
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
              error={errors.expertises}
              helperText={errors.expertises || ''}
              label="Areas of Expertise" placeholder="Areas of Expertise"
            />
          )}
        />
      </form>
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
  </>
  );
};

export default EditProfileForm;
