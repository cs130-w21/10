import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import MatchCard from './MatchCard';
import { useAuth } from '../../services/AuthContext';
import { Typography, Grid, FormRow  } from '@material-ui/core';
import './MatchPage.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	paper: {
	  margin: theme.spacing(10),
	},
	grid: {
		margin: "auto"
	}
  }));

function MatchPage() {
	const [matches, setMatches] = useState("Loading...");
	const {uid, userData} = useAuth();
	const classes = useStyles();

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
		else{
			let u = matches.map((id) => <MatchCard key={id} user_id={id} className={classes.paper}/>);
			let k = [];
			let temp = []
			for(let i in u)
			{
				temp.push(u[i]);
				if(temp.length == 4)
				{
					k.push(<Grid container item spacing={3} className={classes.grid}> {temp} </Grid>);
					temp = [];
				}
			}
			k.push(<Grid container item  spacing={3} className={classes.grid}> {temp} </Grid>);
			setMatches(k);
		}
	},[]);


	return ( 
	<div >
		<br />
		<Typography variant="h4"> 
			View Your Matches
		</Typography>
		<br /> <br />
		<div className="MatchPage" display="flex">
			<Grid container spacing={1} className={classes.grid}>
				{matches}
			</Grid>
		</div>
	</div>
	);
}


export default MatchPage;