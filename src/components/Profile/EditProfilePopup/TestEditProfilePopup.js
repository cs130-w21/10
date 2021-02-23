import React, { useState } from 'react';
import EditProfilePopup from './EditProfilePopup';

const TestEditProfilePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <div>
      <h1>Edit Page to test a user's edit profile popup</h1>
      <button onClick={openPopup}>Show Edit Profile Popup</button>
      
      <EditProfilePopup
        isOpen={showPopup}
        onDismiss={closePopup}
      />
    </div>
  );
};

export default TestEditProfilePopup;
