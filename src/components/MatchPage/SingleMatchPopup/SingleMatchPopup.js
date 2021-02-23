import React from 'react';

// Documentation here: https://reach.tech/dialog/
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

const SingleMatchPopup = ({ isOpen, onDismiss, userProfile }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onDismiss}
      allowPinchZoom={true}
    >
      <div className="profile">
        <div className="profile-top">
          <img className="profile-pic"
            src={userProfile.profile_pic_url}
            alt={`Profile Pic: ${userProfile.name}`}
          />
          <div className="profile-summary">
            <div className="profile-name">
              <h4>{userProfile.name}</h4>
            </div>
            <div className="profile-company">
              <h5>{userProfile.work}</h5>
            </div>
            <div className="profile-education">
              <h5>{userProfile.education}</h5>
            </div>
          </div>
        </div>
        <div className="profile-bottom">
          {/* <div className="profile-details">
            <p>{userProfile.details}</p>
          </div>
          <div className="profile-interests">
            <ul>
              {userProfile.interests.map((interest) =>
                <li>{interest}</li>
              )}
            </ul>
          </div> */}
          <div className="profile-contact">
            <div>{`Email: ${userProfile.email}`}</div>
            <div>{`Phone: ${userProfile.phone}`}</div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SingleMatchPopup;
