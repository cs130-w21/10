import React, { useState,useEffect } from 'react';
import { db } from '../../services/firebase';
import './MatchCard.css';
import SingleMatchPopup from './SingleMatchPopup/SingleMatchPopup';
import { Button,Typography } from '@material-ui/core';

function MatchCard(props) {
    const [info, setInfo] = useState({name: "Loading..."});
    const [showPopup, setShowPopup] = useState(false);
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);
    let user_info = {};

    useEffect(() =>{
        const userRef = db.ref('Users/'+props.user_id);
        userRef.on('value', (snapshot) => {

            if(snapshot !== null)
            {
                for( let i in snapshot.child('personalInfo').val())
                    user_info[i] = snapshot.child('personalInfo').child(i).val();
                for( let i in snapshot.child('contactInfo').val())
                    user_info[i] = snapshot.child('contactInfo').child(i).val();
                user_info["button"] = (<Button onClick={openPopup}>Show the Single Match!</Button> );
                setInfo(user_info);
            }
        });
    },[]);


    return(
        <div className="MatchCard">
                 <Typography variant="h3">
                    {info.name}
                </Typography>
 				<br />
                 <Typography variant="h4">
                    {info.work}
                </Typography>
 				<br />
                 <Typography variant="h4">
                    {info.education}
                </Typography>
                 <br />
                {info.button}
                <SingleMatchPopup
                   isOpen={showPopup}
                   onDismiss={closePopup}
                   userProfile={info}
               />
        </div>
    );

}

export default MatchCard;