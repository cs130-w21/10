import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import MatchCard from './MatchCard';
import { useAuth } from '../../services/AuthContext';
import './MatchPage.css';

function MatchPage() {
	const [matches, setMatches] = useState("Loading...");
	const {userData} = useAuth();

	useEffect(() => {
		const user_data = userData;
		const likes = [];
		const likedBy = [];
		for( let i in userData.likes ){
			if(likes.includes(userData.likes[i]) == false)
				likes.push(userData.likes[i]);
		}
		for( let i in userData.likedBy)
		{
			if(likedBy.includes(userData.likedBy[i]) == false)
				likedBy.push(userData.likedBy[i]);
		}
		const matches = likes.filter( value => likedBy.includes(value) );
		if(matches.length === 0)
			setMatches("No matches found!")
		else
			setMatches(matches.map((id) => <MatchCard key={id} user_id={id} />));
	},[]);


	return ( 
	<div >
		<h1>Match Page</h1> 
		<div className="MatchPage"> 
			{matches}
		</div>
	</div>
	);
}


export default MatchPage;