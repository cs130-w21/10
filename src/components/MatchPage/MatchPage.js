import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import MatchCard from './MatchCard';
import './MatchPage.css';

// class MatchPage extends React.Component{
// 	constructor() {
// 		super();
// 		this.state = {
// 			matches: [],
// 			hasMatches: undefined
// 		};
// 	}

// 	callInOrder(first, second){
// 		first();
// 		second();
// 	}

// 	componentDidMount(){
// 		//get user id 
// 		const userId = "test";
// 		let likes = new Set();
// 		let likedBy = new Set();
// 		const likesRef = db.ref('Users/'+userId+'/Likes');
// 		const likedByRef = db.ref('Users/'+userId+'/LikedBy');


// 		likesRef.on('value', (snapshot) => {
// 			if(snapshot !== null)
// 			{
// 				for( let i in snapshot.val())
// 				{
// 					likes.add(snapshot.child(i).val());
// 				}
// 				// console.log(likes);
// 				likedByRef.on('value', (c_snapshot) => {
// 				if(snapshot !== null)
// 				{
// 					for( let i in c_snapshot.val())
// 					{
// 						likedBy.add(c_snapshot.child(i).val());
// 					}
// 					// console.log(likedBy);
// 					let intersection = new Set([...likes].filter(x => likedBy.has(x)));
// 					// console.log(intersection.size);
// 					// console.log(Array.from(intersection));
// 					if (intersection.size  === 0)
// 					{
// 						this.setState({matches: null, hasMatches: false});
// 					}
// 					else
// 					{
// 						this.setState({matches: Array.from(intersection), hasMatches: true});
// 					}
// 				}
// 				});
// 			}
// 		});
// 	}



// 	render(){
// 		var opt = '';
// 		if(this.state.hasMatches === undefined)
// 		{
// 			opt ='Loading...';
// 		}
// 		else if(this.state.hasMatches === false)
// 		{
// 			opt='No matches found!';
// 		}
// 		else{
// 			opt = this.state.matches.map((id) => <MatchCard key={id} user_id={id} />)

// 		}
// 		return(
// 			<div>
// 				<h1> Match Page </h1>
// 				{opt}
// 			</div>
// 		);
// 	}
// }

function MatchPage() {
	const [matches, setMatches] = useState("Loading...");
	useEffect(() => {
		const userId = "test";
		let likes = new Set();
		let likedBy = new Set();
		const userRef = db.ref('Users/'+userId);
		userRef.on('value', (snapshot) => {
			if(snapshot !== null || snapshot !== undefined)
			{
				let likesRef = snapshot.child('Likes');
				let likedByRef = snapshot.child('LikedBy');
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