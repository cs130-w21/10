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
					likes.add(snapshot.child(i).val());
				}
				// console.log(likes);
				likedByRef.on('value', (c_snapshot) => {
				if(snapshot !== null)
				{
					for( let i in c_snapshot.val())
					{
						likedBy.add(c_snapshot.child(i).val());
					}
					// console.log(likedBy);
					let intersection = new Set([...likes].filter(x => likedBy.has(x)));
					// console.log(intersection.size);
					// console.log(Array.from(intersection));
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
		var opt = '';
		if(this.state.hasMatches === undefined)
		{
			opt ='Loading...';
		}
		else if(this.state.hasMatches === false)
		{
			opt='No matches found!';
		}
		else{
			opt = this.state.matches.map((id) => <MatchCard key={id} user_id={id} />)

		}
		return(
			<div>
				<h1> Match Page </h1>
				{opt}
			</div>
		);
	}
}

class MatchCard extends React.Component{
	constructor(props){
		super(props);
		// this.state = {
		// 	userInfo: undefined
		// };
		this.state = {
			info: undefined
		};

	}

	componentDidMount(){
		let user_info = {}
		const userRef = db.ref('Users/'+this.props.user_id+'/personalInfo'); 
		userRef.on('value', (snapshot) => {
			if(snapshot !== null)
			{
				for( let i in snapshot.val())
				{
					user_info[snapshot.child(i).key] = snapshot.child(i).val();
				}
				this.setState({info: user_info})
			}
		});
		
	}

	render(){
		if(this.state.info !== undefined)
		{
			return(
			<div>
				{this.state.info.name}
				<br />
				{this.state.info.work}
				<br />
				{this.state.info.education}
			</div>);
		}
		else{
			return(<div></div>);
		}
	}
}

export default MatchPage;