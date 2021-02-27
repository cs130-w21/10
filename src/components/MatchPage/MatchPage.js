import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import MatchCard from './MatchCard';
import { useAuth } from '../../services/AuthContext';
import './MatchPage.css';

function MatchPage() {
	const [matches, setMatches] = useState("Loading...");
	const {uid, userData} = useAuth();

	useEffect(() => {
		const userId = uid;
		const user_data = userData;
		let likes = new Set();
		let likedBy = new Set();
		const userRef = db.ref('Users/'+userId);
		userRef.on('value', (snapshot) => {
			if(snapshot !== null || snapshot !== undefined)
			{
				let likesRef = snapshot.child('likes');
				let likedByRef = snapshot.child('likedBy');
				if(likesRef.val() !== null || likesRef.val() !== undefined)
				{
					for(let i in likesRef.val())
					{
						likes.add(likesRef.child(i).val());
					}
				}
				if(likedByRef.val() !== null || likedByRef.val() !== undefined)
				{
					for(let i in likedByRef.val())
					{
						likedBy.add(likedByRef.child(i).val());
					}
				}
				let intersection = new Set([...likes].filter(x => likedBy.has(x)));
				if (intersection.size  === 0)
				{
					setMatches("No matches found!");
				}
				else
				{
					// this.setState({matches: Array.from(intersection), hasMatches: true});
					let a = Array.from(intersection);
					let u = a.map((id) => <MatchCard key={id} user_id={id} />);
					setMatches(u)
				}
			}
		});
		// const likes = [];
		// const likedBy = [];
		// for( let i in userData.likes )
		// 	likes.push(userData.likes[i])
		// for( let i in userData.likedBy)
		// 	likedBy.push(userData.likedBy[i])
		// const matches = likes.filter( value => likedBy.includes(value) );
		// if(matches.length === 0)
		// 	setMatches("No matches found!")
		// else
		// 	setMatches(a.map((id) => <MatchCard key{id} user_id={id} />));
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