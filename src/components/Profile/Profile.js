import React, { useEffect, useState } from 'react';
import Image from 'material-ui-image';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../services/AuthContext';
import EditProfilePopup from './EditProfilePopup';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(5),
    paddingRight: "12%",
    
  },
  profilePic: {
    width: theme.spacing(30),
    height:theme.spacing(30),
    marginLeft: "25%",
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
  let [personalInfo, setPersonalInfo] = useState({
    AreaOfExpertise: "",
    Education: "",
    Name: "",
    Work: "",
  })
  let [contactInfo, setContactInfo] = useState({
    email: "",
    linkedin: "",
  })

  const [showEditPopup, setShowEditPopup] = useState(false);
  const openEditPopup = () => setShowEditPopup(true);
  const closeEditPopup = () => setShowEditPopup(false);
  
  useEffect(() => {
      setPersonalInfo(userData.personalInfo);
      setContactInfo(userData.contactInfo);
      console.log(userData);
    }, [userData]);
  return (
    <>
      <button onClick={openEditPopup}>Edit Profile</button>
      <EditProfilePopup isOpen={showEditPopup} onDismiss={closeEditPopup} />
      <Grid container className={classes.grid} justify="center" spacing={5}>
        
          <Grid item container xs={3} justify="center" alignItems="center">
            <Grid item xs={12}>
              <Avatar src="/placeholder.jpg" className={ classes.profilePic } style={{ justifyContent: "center", display: "flex" }}/>
            </Grid>
            <Grid item xs={5}>
              AREAS OF INTEREST
            </Grid>
            <Grid item xs={7}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12}>
            <Typography gutterBottom align="left" variant="h6" component="h6">
              React
            </Typography>
            </Grid>
            <Grid item xs={5}>
              AREAS OF EXPERTISE
            </Grid>
            <Grid item xs={7}>
              <Divider className={classes.divider} />
            </Grid>
            
            
          </Grid>
    
            
          
      
        <Grid item xs={9}>
          <Typography align="left" variant="h4" component="h4">
            {personalInfo.name}
          </Typography>
          <Typography gutterBottom align="left" variant="h6" component="h6">
            Position
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Bio
          </Typography>
          <Typography paragraph align="left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Work Experience
          </Typography>
          <Typography paragraph align="left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Eduction
          </Typography>
          <Typography paragraph align="left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Contact Info
          </Typography>
          <Typography paragraph align="left">
            Email: {contactInfo.email}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
  
}
