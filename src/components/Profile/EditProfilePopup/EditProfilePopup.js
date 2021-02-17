import React, { useState, useEffect } from 'react';

// Documentation here: https://reach.tech/dialog/
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import { useAuth } from '../../../services/AuthContext';

const EditProfilePopup = ({ isOpen, onDismiss }) => {
  // TODO: Can we not stringify userData??
  const { userData, updateUserData } = useAuth();

  const [personalInfo, setPersonalInfo] = useState({});
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    const userDataObj = JSON.parse(userData);
    setPersonalInfo(userDataObj.personalInfo);
    setContactInfo(userDataObj.contactInfo);
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData({
      ...JSON.parse(userData),
      personalInfo,
      contactInfo,
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onDismiss}
      allowPinchZoom={true}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={personalInfo.name}
            onChange={e => setPersonalInfo({ ...personalInfo, name: e.target.value })}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </Dialog>
  );
};

export default EditProfilePopup;
