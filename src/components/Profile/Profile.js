import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useAuth } from '../../services/AuthContext';
import EditProfilePopup from './EditProfilePopup';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(5),
    paddingRight: theme.spacing(5),
    minWidth: theme.spacing(150),

  },
  profilePic: {
    width: theme.spacing(25),
    height: theme.spacing(25),
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
  areaTitle: {
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.75",
    color: "#808080",
  },
  mainTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    lineHeight: "1.75",
    color: "#515fb0",
  },
  areaEntry: {
    fontWeight: "400",
    fontSize: "0.9rem",
    lineHeight: "1.5",
  },
  contact: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
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
  console.log(userData.personalInfo.profilePicture)

  return (
    <>
      <EditProfilePopup isOpen={showEditPopup} onDismiss={closeEditPopup} />
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
      >

      
        <Grid item xs={12} sm={8} lg={8} container className={classes.grid} justify="flex-start" spacing={5}>
          <Grid item container xs={12} sm={5} lg={4} alignItems="center" justify="flex-start">
            <Grid item xs={12} justify="center">
              <Image src={userData.personalInfo.profilePicture || 'placeholder.jpg'} cover={true} className={ classes.profilePic }/>
            </Grid>
            <Grid item xs={12} sm={9} md={6} lg={5} xl={4}>
              <Typography align="left" variant="subtitle2" component="h4" className={classes.areaTitle}>
                INTERESTS
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={6} lg={7} xl={8}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12}>
            {
            userData.interests.map((interest) => (
              <Typography align="right" variant="body1" component="h6" className={classes.areaEntry}>
                {interest}
              </Typography>
            ))}
            <br />
            <br />
            </Grid>
            <Grid item xs={12} sm={9} md={6} lg={5} xl={4}>
            <Typography align="left" variant="subtitle2" component="h4" className={classes.areaTitle}>
              EXPERTISE
            </Typography>
              
            </Grid>
            <Grid item xs={6} sm={3} md={6} lg={7} xl={8}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12}>
            {
            userData.expertises.map((interest) => (
              <Typography align="right" variant="body1" component="h6" className={classes.areaEntry}>
                {interest}
              </Typography>
            ))}
            </Grid>
              
          </Grid>
          <Grid item xs={12} sm={7} lg={8}>
            <Typography align="left" variant="h4" component="h4">
              {userData.personalInfo.name}
              <IconButton onClick={openEditPopup}>
                <EditIcon />
              </IconButton>
            </Typography>
            
            <Typography align="left" variant="subtitle2" component="h4" className={classes.areaTitle}>
              {userData.personalInfo.work.position}
            </Typography>
              
            <Typography align="left" variant="subtitle2" component="h4" className={classes.mainTitle}>
              BIO
            </Typography>
            <Typography paragraph align="left">
              {userData.personalInfo.bio || "Edit Profile to add your Bio!"}
            </Typography>
            <Typography align="left" variant="subtitle2" component="h4" className={classes.mainTitle}>
              WORK EXPERIENCE
            </Typography>
            <Typography align="left" variant="subtitle2" component="h4" className={classes.areaTitle}>
            {userData.personalInfo.work.company}, {userData.personalInfo.work.position}
              {/* replace this later w/ info from database */}
            </Typography>
            <Typography paragraph align="left">
            {userData.personalInfo.work.description}
            </Typography>
            <Typography align="left" variant="subtitle2" component="h4" className={classes.mainTitle}>
              EDUCATION
            </Typography>
            <Typography align="left" variant="subtitle2" component="h4" className={classes.areaTitle}>
              {userData.personalInfo.education.school}
            </Typography>
            <Typography align="left">
              {userData.personalInfo.education.major} major
            </Typography>
            <Typography align="left">
              Class of {userData.personalInfo.education.gradYear}
            </Typography>
            <Typography align="left" variant="subtitle2" component="h4" className={classes.mainTitle}>
              CONTACT INFO
            </Typography>
            <Typography align="left" className={classes.contact}>
            <EmailIcon />
              : {userData.contactInfo.email} 
            </Typography>

            
            <Typography paragraph align="left" className={classes.contact}>
              <LinkedInIcon />
              : <a href={userData.contactInfo.linkedin}> {userData.contactInfo.linkedin}</a>
            </Typography>
            
          </Grid>
        </Grid>
      </Grid>
    </>
  );
  
}
