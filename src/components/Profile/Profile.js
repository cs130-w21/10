import React, { useEffect, useState } from 'react';
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
    paddingRight: theme.spacing(5),
    minWidth: theme.spacing(100),

  },
  profilePic: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    overflow: "hidden",
    marginBottom: theme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  interestedArea: {
    textAlign: "left",
  },
  divider: {
    backgroundColor: "black",
  },
  leftGrid: {
    minWidth: theme.spacing(35),

  },
  rightGrid: {

  }
}));

export default function Profile() {
  const classes = useStyles();
  const { userData } = useAuth();

  /* This is if we decide to use the EditProfile popup for redirection,
  instead of a register page. We'd then use the incompleteProfile and pass it
  as a prop to EditProfile, along with the onDismiss and isOpen props.

  let location = useLocation();
  let editPopupDefaultValue = false;
  const incompleteProfile = location.state.incompleteProfile
  if (incompleteProfile) {
    editPopupDefaultValue = true;
  }
  const [showEditPopup, setShowEditPopup] = useState(editPopupDefaultValue);
  */

  const [showEditPopup, setShowEditPopup] = useState(false);
  const openEditPopup = () => setShowEditPopup(true);
  const closeEditPopup = () => setShowEditPopup(false);

  if (!userData) {
    return <div> Loading </div>
  }
  // just make sure these aren't null
  if (!userData.interests) {
    userData.interests = [];
  }
  if (!userData.expertises) {
    userData.expertises = [];
  }


  return (
    <>
      <EditProfilePopup isOpen={showEditPopup} onDismiss={closeEditPopup} /> 
      <Grid container className={classes.grid} justify="center" spacing={5}>
        
          <Grid item container xs={3} justify="center" alignItems="center" className={classes.leftGrid}>
            <Grid item xs={12}>
              <Avatar src={userData.personalInfo.profilePicture} className={ classes.profilePic } style={{ justifyContent: "center", display: "flex" }}/>
            </Grid>
            <Grid item xs={5}>
              AREAS OF INTEREST
            </Grid>
            <Grid item xs={7}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12}>
            {
            userData.interests.map((interest) => (
              <Typography gutterBottom align="right" variant="subtitle1">
                {interest}
                <br />
              </Typography>
            ))}
            <br />
            <br />
            </Grid>
            <Grid item xs={5}>
              AREAS OF EXPERTISE
            </Grid>
            <Grid item xs={7}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12}>
            {
            userData.expertises.map((interest) => (
              <Typography gutterBottom align="right" variant="subtitle1">
                {interest}
                <br />
              </Typography>
            ))}
            </Grid>
            
          </Grid>
    
            
          
      
        <Grid item xs={9} className={classes.rightGrid}>
          <Typography align="left" variant="h4" component="h4">
            {userData.personalInfo.name}
            <IconButton onClick={openEditPopup}>
              <EditIcon />
            </IconButton>
          </Typography>
          
          <Typography gutterBottom align="left" variant="h6" component="h6">
            Position
          </Typography>
          <Typography paragraph align="left">
            {userData.personalInfo.work}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Bio
          </Typography>
          <Typography paragraph align="left">
            {userData.personalInfo.Bio || "Edit Profile to add your Bio!"}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Work Experience
          </Typography>
          <Typography paragraph align="left">
            {userData.personalInfo.work}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Education
          </Typography>
          <Typography paragraph align="left">
            {userData.personalInfo.education}
          </Typography>
          <Typography align="left" variant="h6" component="h6">
            Contact Info
          </Typography>
          <Typography paragraph align="left">
            Email: {userData.contactInfo.email}
            
          </Typography>
          <Typography paragraph align="left">
            LinkedIn: <a href={userData.contactInfo.linkedin}>{userData.contactInfo.linkedin}</a>

          </Typography>
          
        </Grid>
      </Grid>
    </>
  );
  
}
