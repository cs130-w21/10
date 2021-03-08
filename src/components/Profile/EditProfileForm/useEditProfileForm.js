import { useState, useEffect, useCallback } from 'react';

import { useAuth } from '../../../services/AuthContext';
import { db, storage, getCurrentUser } from '../../../services/firebase';

/**
 * @typedef {Object} UserWork
 * @prop {string} company     - A user's current company
 * @prop {string} position    - A user's current position
 * @prop {string} description - A description of the user's work
 */

/**
 * @typedef {Object} UserEducation
 * @prop {string} school    - A user's alma mater
 * @prop {string} major     - A user's major
 * @prop {string} gradYear  - The year the user graduated from their most recent education
 */

/**
 * @typedef {Object} UserPersonalInfo
 * @prop {string} name              - A user's name
 * @prop {UserEducation} education  - A user's education details
 * @prop {UserWork} work            - A user's employment/work details
 * @prop {string} bio               - A user's personal biography
 */

/**
 * @typedef {Object} UserContactInfo
 * @prop {string} email     - A user's email
 * @prop {string} linkedin  - A user's linkedin URL
 * @prop {string} phone     - A user's phone number
 */

/**
 * @typedef {Object} UserData
 * @description A JSON object that contains all the user's info, retrieved from Firebase DB.
 * @prop {UserPersonalInfo} personalInfo  - A user's personal information
 * @prop {UserContactInfo} contactInfo    - A user's contact information
 * @prop {array} interests                - An array of a user's interests. Each entry is a `string`.
 * @prop {array} expertises               - An array of a user's areas of expertise. Each entry is a `string`.
 */

/**
 * @module useEditProfileForm
 */

/**
 * @global
 * @typedef {Object} Errors
 * An object whose key-value pairs are the form fields that have
 *    errors paired with the helper text for that form field.
 */

/**
 * @function validate
 * @param {UserData} userValues   - All the details related to a user.
 * @description Validation function for the form data.
 *              Currently requires a name, at least one interest,
 *              and at least one area of expertise.
 * @returns {Errors} 
 */
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

/**
 * @global
 * @typedef {Object} UseEditProfileFormResult
 * @prop {array} interestsOptions         - A list of User Interests. Used for autocomplete suggestions.
 * @prop {callback} setProfilePicFile     - A function callback that sets the profile picture
 *                                          file in `useEditProfileForm`'s internal state.
 * @prop {UserPersonalInfo} personalInfo  - A user's current mid-edit personal info.
 * @prop {callback} updatePersonalInfo    - A function callback that sets `personalInfo` in
 *                                          `useEditProfileForm`'s internal state.
 * @prop {UserContactInfo} contactInfo    - A user's current mid-edit contact info.
 * @prop {callback} updateContactInfo     - A function callback that sets `contactInfo` in
 *                                          `useEditProfileForm`'s internal state.
 * @prop {array} userInterests            - A user's current mid-edit list of interests.
 * @prop {callback} setUserInterests      - A function callback that sets `userInterests` in
 *                                          `useEditProfileForm`'s internal state.
 * @prop {array} userExpertises           - A user's current mid-edit list of areas of expertise.
 * @prop {callback} setUserExpertises     - A function callback that sets `userExpertises` in
 *                                          `useEditProfileForm`'s internal state.
 * @prop {callback} resetFormValues       - A function callback that resets the form values to
 *                                          the UserData according to the database.
 * @prop {callback} submitFormValues      - A function callback that saves the form values to
 *                                          the database if there are no validation errors.
 * @prop {callback} uploadImage           - A function callback that will upload the photo to
 *                                          the cloud storage and store the URL to the
 *                                          user's profile
 * @prop {Errors} errors                  - Set after validating the current form values.
 */

/**
 * @function useEditProfileForm
 * @description A custom React Hook to manage the state and actions for the [Edit Profile form]{@link EditProfileForm}.
 * @returns {UseEditProfileFormResult}
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
