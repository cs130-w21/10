import { useState, useEffect, useCallback } from 'react';

import { useAuth } from '../../../services/AuthContext';
import { db, storage, getCurrentUser } from '../../../services/firebase';

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
    education: {
    },
    work: {
    },
  });
  const [contactInfo, setContactInfo] = useState({});
  const [userInterests, setUserInterests] = useState([]);
  const [userExpertises, setUserExpertises] = useState([]);

  const resetFormValues = useCallback(() => {
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
  }, [userData]);


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

  // TODO: Put an alert after write to DB?
  const submitFormValues = () => {
    updateUserData({
      ...userData,
      personalInfo,
      contactInfo,
      interests: userInterests,
      expertises: userExpertises,
    });
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
  };
};

export default useEditProfileForm;
