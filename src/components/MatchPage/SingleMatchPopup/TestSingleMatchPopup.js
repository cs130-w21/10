import React, { useState, useEffect } from 'react';
import SingleMatchPopup from './SingleMatchPopup';

const TestSingleMatchPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const [userProfile, setUserProfile] = useState({
    name: '',
    company: '',
    education: '',
    email: '',
    phone: '',
    profile_pic_url: '',
    details: '',
    interests: [],
  });

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(results => results.json())
      .then(data => {
        const api_profile = data.results[0];
        setUserProfile({
          ...userProfile,
          name: `${api_profile.name.first} ${api_profile.name.last}`,
          company: 'Unemployed LMAO',
          education: 'UCLA B.S. in Computer Science',
          email: api_profile.email,
          phone: api_profile.phone,
          profile_pic_url: api_profile.picture.large,
          details: 'Blah blah blah',
          interests: [
            'Graphic Design is my Passion',
            'Cooking',
            'Rock Climbing'
          ],
        });
      });
  }, []);

  return (
    <div>
      <h1>Match Page to test a single match popup</h1>
      <button onClick={openPopup}>Show the Single Match!</button>
      
      <SingleMatchPopup
        isOpen={showPopup}
        onDismiss={closePopup}
        userProfile={userProfile}
      />
    </div>
  );
};

export default TestSingleMatchPopup;
