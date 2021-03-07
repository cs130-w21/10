import React from 'react';

import {
  Avatar,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography, 
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profilePic: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    overflow: "hidden",
    marginBottom: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  leftG: {
    width: theme.spacing(25)
  },
  rightG: {
    width: theme.spacing(60),
    marginLeft: theme.spacing(3)
  },
  divider: {
    backgroundColor: "black"
  },
  grid: {
    minWidth: theme.spacing(85)
  }
  }));

/**
 * @typedef {Object} SingleMatchUserProfile
 * @prop {string} name            - The match user's name
 * @prop {string} profilePicture  - URL to the match user's profile picture
 * @prop {string} work            - The match user's work summary
 * @prop {string} bio             - The match user's profile biography
 * @prop {string} education       - The match user's education summary
 * @prop {string} email           - The match user's email
 * @prop {string} linkedin        - The match user's LinkedIn profile URL
 */

/**
 * @class
 * @classdesc Component to render a Popup for a user's single match object
 * @extends React.Component
 * @param {boolean}                  isOpen        - A boolean to control whether the popup should be displayed or hidden.
 * @param {callback}                 onDismiss     - A callback that will be called when a user tries to exit the Dialog/Popup.
 * @param {SingleMatchUserProfile}   userProfile   - A JSON object that contains all the data needed to render that user's single match.
 * 
 * @example
 * // In this example, popup stays open and has no way to be closed
 * test_profile = { name: 'hello', work: 'Unemployed' ...}
 * <SingleMatchPopup isOpen={true} userProfile={test_profile} />
 *
 * @example
 * // A typical use case
 * test_profile = { name: 'hello', work: 'Unemployed' ...}
 * const [open, setOpen] = useState(false);
 * <SingleMatchPopup isOpen={open} onDismiss={() => setOpen(!open)} userProfile={test_profile} />
 */
const SingleMatchPopup = ({ isOpen, onDismiss, userProfile }) => {
  const classes = useStyles();
  
  return (
    <Dialog
      open={isOpen}
      onClose={onDismiss}
      fullWidth={true}
      maxWidth='md'
      minWidth='md'
    >
      <DialogContent>

        <Grid container spacing={2} className={classes.grid}> 
          <Grid item container className={classes.leftG}>
            <Grid item>
              <Avatar 
                className={classes.profilePic}
                src={userProfile.profilePicture}
              />
            </Grid>
          </Grid>
          <Grid item className={classes.rightG}>
          <Typography align="left" variant="h4" component="h4">
            {userProfile.name}
          </Typography>
          <br />
          <Typography gutterBottom align="left" variant="h6" component="h6">
            Work
          </Typography>
          <Typography paragraph align="left">
            {userProfile.work}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Bio
          </Typography>
          <Typography paragraph align="left">
            {userProfile.bio}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Education
          </Typography>
          <Typography paragraph align="left">
            {userProfile.education}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Contact Info
          </Typography>
          <Typography paragraph align="left">
            Email: {userProfile.email}
          </Typography>
          <Typography paragraph align="left">
            LinkedIn: <a href={userProfile.linkedin}>{userProfile.linkedin}</a>
          </Typography>

          </Grid>  
        </Grid>
      </DialogContent>
      {/* <div className="profile">
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
          </div> 
          <div className="profile-contact">
            <div>{`Email: ${userProfile.email}`}</div>
            <div>{`Phone: ${userProfile.phone}`}</div>
          </div>
        </div>
      </div> */}
    </Dialog>
  );
};

export default SingleMatchPopup;
