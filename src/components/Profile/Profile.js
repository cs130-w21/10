import React, { useEffect, useState } from 'react';
import Image from 'material-ui-image';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { useAuth } from '../../services/AuthContext';
import EditProfilePopup from './EditProfilePopup';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(5),
    paddingRight: "12%",
    
  },
  profilePic: {
    width: "90%",
    height: "90%",
    marginLeft: "",
  },
  interestedArea: {
    textAlign: "left",
  },
  divider: {
    backgroundColor: "black",
  }
}));

export default function Profile() {
  const classes = useStyles();
  const { userData } = useAuth();
  const [userInfo] = useState(userData);

  // just make sure these aren't null
  if (!userData.interests) {
    userData.interests = [];
  }
  if (!userData.expertises) {
    userData.expertises = [];
  }

  const [showEditPopup, setShowEditPopup] = useState(false);
  const openEditPopup = () => setShowEditPopup(true);
  const closeEditPopup = () => setShowEditPopup(false);

  return (
    <>
      <EditProfilePopup isOpen={showEditPopup} onDismiss={closeEditPopup} />
      <Grid container className={classes.grid} justify="center" spacing={5}>
        
          <Grid item container xs={3} justify="center" alignItems="center">
            <Grid item xs={12}>
              <Avatar src={userInfo.personalInfo.profilePicture} className={ classes.profilePic } style={{ justifyContent: "center", display: "flex" }}/>
            </Grid>
            <Grid item xs={5}>
              AREAS OF INTEREST
            </Grid>
            <Grid item xs={7}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12}>
            {
            userInfo.interests.map((interest) => (
              <Typography gutterBottom align="left" variant="h6" component="h6">
                {interest}
              </Typography>
            ))};
            </Grid>
            <Grid item xs={5}>
              AREAS OF EXPERTISE
            </Grid>
            <Grid item xs={7}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12}>
            {
            userInfo.expertises.map((interest) => (
              <Typography gutterBottom align="left" variant="h6" component="h6">
                {interest}
              </Typography>
            ))};
            </Grid>
            
          </Grid>
    
            
          
      
        <Grid item xs={9}>
          <Typography align="left" variant="h4" component="h4">
            {userInfo.personalInfo.name}
            <IconButton onClick={openEditPopup}>
              <EditIcon />
            </IconButton>
          </Typography>
          
          <Typography gutterBottom align="left" variant="h6" component="h6">
            Position
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Bio
          </Typography>
          <Typography paragraph align="left">
            {userInfo.personalInfo.Bio || "Edit Profile to add your Bio!"}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Work Experience
          </Typography>
          <Typography paragraph align="left">
            {userInfo.personalInfo.work}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Education
          </Typography>
          <Typography paragraph align="left">
            {userInfo.personalInfo.education}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Contact Info
          </Typography>
          <Typography paragraph align="left">
            Email: {userInfo.contactInfo.email}
            
          </Typography>
          <Typography paragraph align="left">
            LinkedIn: <a href={userInfo.contactInfo.linkedin}>{userInfo.contactInfo.linkedin}</a>
            
          </Typography>
          
        </Grid>
      </Grid>
    </>
  );
  
}
