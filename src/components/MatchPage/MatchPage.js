import React from 'react';
import { db } from '../../services/firebase';

class MatchPage extends React.Component{
	constructor() {
		super();
		this.state = {
			matches: [],
			hasMatches: undefined
		};
	}

	callInOrder(first, second){
		first();
		second();
	}

	componentDidMount(){
		//get user id 
		const userId = "test";
		let likes = new Set();
		let likedBy = new Set();
		const likesRef = db.ref('Users/'+userId+'/Likes');
		const likedByRef = db.ref('Users/'+userId+'/LikedBy');


		likesRef.on('value', (snapshot) => {
			if(snapshot !== null)
			{
				for( let i in snapshot.val())
				{
					likes.add(i);
				}
				console.log(likes);
				likedByRef.on('value', (snapshot) => {
				if(snapshot !== null)
				{
					for( let i in snapshot.val())
					{
						likedBy.add(i);
					}
					console.log(likedBy);
					let intersection = new Set([...likes].filter(x => likedBy.has(x)));
					console.log(intersection.size);
					console.log(Array.from(intersection));
					if (intersection.size  === 0)
					{
						this.setState({matches: null, hasMatches: false});
					}
					else
					{
						this.setState({matches: Array.from(intersection), hasMatches: true});
					}
				}
				});
			}
		});
	}



	render(){
		if(this.state.hasMatches === undefined)
		{
			return(
				<div>
					<h1> MatchPage </h1>
					Loading...
				</div>
				);
		}
		else if(this.state.hasMatches === false)
		{
			return(
				<div>
					<h1> MatchPage </h1>
					No matches found!
				</div>
				);
		}
		else{
			return(
				<div>
					<h1> MatchPage </h1>
					{this.state.matches}
				</div>
			);
		}
	}
}

class MatchCard extends React.Component{
	constructor(id){
		super();
		this.state = {};
	}

	render(){
		return(<div>Hello</div>);
	}
}

export default MatchPage;