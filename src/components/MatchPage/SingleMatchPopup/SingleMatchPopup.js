import React from 'react';

// Documentation here: https://reach.tech/dialog/
// import { Dialog } from '@reach/dialog';
// import '@reach/dialog/styles.css';
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
            Position
          </Typography>
          <Typography paragraph align="left">
            {userProfile.work}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Bio
          </Typography>
          <Typography paragraph align="left">
            {userProfile.Bio}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Work Experience
          </Typography>
          <Typography paragraph align="left">
            {userProfile.work}
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
