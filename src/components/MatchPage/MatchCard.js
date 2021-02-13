import React, { useState,useEffect } from 'react';
import { db } from '../../services/firebase';
import './MatchCard.css';
function MatchCard(props) {
    const [info, setInfo] = useState({});

    useEffect(() =>{
        const userRef = db.ref('Users/'+props.user_id+'/personalInfo'); 
        let user_info = {}
    
        userRef.on('value', (snapshot) => {
            if(snapshot !== null)
            {
                for( let i in snapshot.val())
                {
                    user_info[snapshot.child(i).key] = snapshot.child(i).val();
                }
                setInfo(user_info)
            }
        });
    },[]);
    return(
        <div className="MatchCard">
 				{info.name}
 				<br />
 				{info.work}
 				<br />
 				{info.education}
        </div>
    );

}

export default MatchCard;