import React, { useState,useEffect } from 'react';
import { db } from '../../services/firebase';
import './MatchCard.css';
import SingleMatchPopup from './SingleMatchPopup/SingleMatchPopup';
import { 
    Button,
    Typography, 
    Avatar, 
    Card,
    CardActions,
    CardActionArea
 } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginLeft: "auto",
      marginRight: "auto",
      margin: theme.spacing(3),
      border: theme.spacing(1),
      borderColor: "black"
    },
    card: {
        width: theme.spacing(30),
        height: theme.spacing(45),
        margin: theme.spacing(2),
        justifyContent: "space-evenly",
        position: "relative",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),

    },
    bottom: {
        justifyContent: "center",
        position: "absolute",
        bottom: "0",
        marginLeft: "auto",
        marginRight: "auto",
        left: "0",
        right: "0",
        textAlign: "center",
        marginBottom: theme.spacing(2)
    }
  }));

function MatchCard(props) {
    const [info, setInfo] = useState({name: "Loading..."});
    const [showPopup, setShowPopup] = useState(false);
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);
    let user_info = {};
    const classes = useStyles();

    useEffect(() =>{
        const userRef = db.ref('Users/'+props.user_id);
        userRef.on('value', (snapshot) => {
            const personalInfo = snapshot.child('personalInfo');
            if(snapshot !== null)
            {
                for(let i in personalInfo.val()) {
                    if (i == 'education') {
                        const education = personalInfo.child(i).val();
                        console.log(education)
                        if (education.major && education.school) {
                            user_info['education'] = education.major + ' @ ' + education.school;
                        } else if (education.major) {
                            user_info['education'] = education.major;
                        } else if (education.school) {
                            user_info['education'] = education.school;
                        } else {
                            user_info['education'] = '';
                        }
                    } else if (i == 'work') {
                        const work = personalInfo.child(i).val();
                        console.log(work)
                        if (work.company && work.position) {
                            user_info['work'] = work.position + ' @ ' + work.company;
                        } else if (work.company) {
                            user_info['work'] = work.company;
                        } else if (work.position) {
                            user_info['work'] = work.position;
                        } else {
                            user_info['work'] = '';
                        }
                    } else {
                        user_info[i] = personalInfo.child(i).val()
                    }
                }
                for( let i in snapshot.child('contactInfo').val()) {
                    console.log(i)
                    console.log(snapshot.child('contactInfo').child(i).val())
                    user_info[i] = snapshot.child('contactInfo').child(i).val();
                }
                user_info["interests"] = snapshot.child('interests').val();
                user_info["expertises"] = snapshot.child('expertises').val();
                user_info["button"] = (<Button onClick={openPopup} size="small" variant="contained" color="secondary" className={classes.bottom}>View Details</Button> );
                setInfo(user_info);
            }
        });
    },[]);


    return(
        <Card className={classes.card}>
                <Avatar src={info.profilePicture} className={classes.large}/>
                <Typography variant="h5">
                    {info.name}
                </Typography>
 				<br />
                <Typography >
                    {info.work}
                </Typography>
                <Typography >
                    {info.education}
                </Typography>
                <br />

               <CardActions >
               {info.button}
                <SingleMatchPopup
                   isOpen={showPopup}
                   onDismiss={closePopup}
                   userProfile={info}
               />
               </CardActions>
        </Card>
    );

}

export default MatchCard;