import { useState, useEffect, useCallback } from 'react';

import { useAuth } from '../../../services/AuthContext';
import { db, storage, getCurrentUser } from '../../../services/firebase';

// Validation function for the form data
// `userValues` has the same structure as `userData`.
const validate = (userValues) => {
  const errors = {};
  if (!userValues.personalInfo.name) {
    errors.name = 'Name is required';
  }
  if (!userValues.interests || userValues.interests.length === 0) {
    errors.interests = 'Please fill in at least one interest';
  }
  if (!userValues.expertises || userValues.expertises.length === 0) {
    errors.expertises = 'Please fill in at least one area of expertise';
  }

  return errors;
};

/*
 * A custom React Hook to manage the state and actions for the Edit Profile form.
 */
const useEditProfileForm = () => {
  const { userData, updateUserData } = useAuth();

  // State for list of interests
  // TODO: Could write new interests to DB when user inputs something new?
  const [interestsOptions, setInterestsOptions] = useState([]);
  // Get list of interests from db
  useEffect(() => {
    // Since our interests list isn't getting updated for now, we can just make the query once
    db.ref('interests/').once('value', (snapshot) => {
      if (snapshot !== null) {
        setInterestsOptions(snapshot.val());
      }
    });
  }, []);

  // State related to form values
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    education: {
    },
    work: {
    },
    bio: '',
  });
  const [contactInfo, setContactInfo] = useState({
    linkedin: '',
  });
  const [userInterests, setUserInterests] = useState([]);
  const [userExpertises, setUserExpertises] = useState([]);
  // State to keep track of form errors and validation
  const [errors, setErrors] = useState({});

  const resetFormValues = useCallback(() => {
    if (!userData) {
      return;
    }

    const dbPersonalInfo = userData.personalInfo;
    // Populate default values of education and work in personalInfo
    const populatedPersonalInfo = {
      ...dbPersonalInfo,
      education: dbPersonalInfo.education ? dbPersonalInfo.education : {
        school: '',
        major: '',
        gradYear: 0,
      },
      work: dbPersonalInfo.work ? dbPersonalInfo.work : {
        company: '',
        position: '',
        description: '',
      },
      bio: dbPersonalInfo.bio ? dbPersonalInfo.bio : '',
    };
    setPersonalInfo(populatedPersonalInfo);
    setContactInfo(userData.contactInfo);
    setUserInterests(userData.interests ? userData.interests : []);
    setUserExpertises(userData.expertises ? userData.expertises : []);
  }, [userData]);

  useEffect(() => {
    resetFormValues();
  }, [resetFormValues, userData]);

  const updatePersonalInfo = (field, subfield) => (val) => {
    if (subfield === undefined) {
      setPersonalInfo({ ...personalInfo, [field]: val });
    } else {
      setPersonalInfo({
        ...personalInfo,
        [field]: {
          ...personalInfo.[field],
          [subfield]: subfield === 'gradYear' ? parseInt(val) : val,
        }
      });
    }
  };

  const updateContactInfo = (field) => (val) => {
    setContactInfo({ ...contactInfo, [field]: val });
  };

  // NOTE: If adding more fields for form validation,
  //        add them to the dependency array.
  // Auto-validate form data upon changes instead of only on submit
  useEffect(() => {
    const errors = validate({
      ...userData,
      personalInfo,
      contactInfo,
      interests: userInterests,
      expertises: userExpertises,
    });
    setErrors(errors);
  }, [personalInfo.name, userInterests, userExpertises]);

  // TODO: Put an alert after write to DB?
  const submitFormValues = () => {
    const userValues = {
      ...userData,
      personalInfo,
      contactInfo,
      interests: userInterests,
      expertises: userExpertises,
    };
    const errors = validate(userValues);
    if (Object.keys(errors).length === 0) {
      updateUserData(userValues);
      return true;
    } else {
      setErrors(errors);
      return false;
    }
  };

  // Upload image to storage
  const uploadImage = () => {
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

  return {
    interestsOptions,
    setProfilePicFile,
    personalInfo,
    updatePersonalInfo,
    contactInfo,
    updateContactInfo,
    userInterests,
    setUserInterests,
    userExpertises,
    setUserExpertises,
    resetFormValues,
    submitFormValues,
    uploadImage,
    errors,
  };
};

export default useEditProfileForm;
