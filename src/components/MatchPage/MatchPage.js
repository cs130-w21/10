import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import MatchCard from './MatchCard';
import { useAuth } from '../../services/AuthContext';
import { Typography, Grid, Box  } from '@material-ui/core';
import './MatchPage.css';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBackIosTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	paper: {
	  margin: theme.spacing(10),
	},
	grid: {

	},
	row: {
		marginLeft: "0px",
		marginRight: "0px",
		width: "100%"
	},
	title: {

	}
  }));

/**
 * @class
 * @classdesc Component to render all matches for a user
 * @extends React.Component
 */
function MatchPage() {
	//set default state as loading matches
	const classes = useStyles();
  /**
   * @member matches
   * @instance
   * @memberof MatchPage
   * @type {string[]}
   * @description An array that contains all the user IDs of the user's matches.
   */
  /**
   * @function setMatches
   * @instance
   * @memberof MatchPage
   * @type {Function}
   * @description Function to set the value of the matches array.
   */
	const [matches, setMatches] = useState("Loading...");
	const {userData} = useAuth();


	useEffect(() => {
		if(userData)
		{
			const likes = [];
			const likedBy = [];

			//collect all of the profiles that the user has liked
			for( let i in userData.likes ){
				if(likes.includes(userData.likes[i]) == false)
					likes.push(userData.likes[i]);
			}

			//collect all of the profiles that have liked all the users
			for( let i in userData.likedBy)
			{
				if(likedBy.includes(userData.likedBy[i]) == false)
					likedBy.push(userData.likedBy[i]);
			}

			//find all profiles that like the user and the user has liked back
			const matches = likes.filter( value => likedBy.includes(value) );

			//if there are 0 people that like the user and the user has liked back
			//then there are no matches found
			if(matches.length === 0)
				setMatches("No matches found!")
			else{
				//here, there exists at least one person that likes the user and the user has liked back
				//for each of the matches, push a match card with the other user's userid
				//fit each matchcard into a grid format
				let u = matches.map((id) => <Grid > <MatchCard key={id} user_id={id} className={classes.paper}/> </Grid>);
				let k = [];
				let temp = []
				for(let i in u)
				{
					temp.push(u[i]);
					if(temp.length == 4)
					{
						k.push(<Grid container item
							xs={8}  
							sm={7}
							md={7}
							lg={12}
							direction="row"
							justify="center"
							alignItems="center"
							className={classes.row}> {temp} </Grid>);
						temp = [];
					}
				}
				k.push(<Grid container item
					xs={8} 			
					sm={7}
					md={7}
					lg={12}
					direction="row"
					justify="center"
					alignItems="center"
					className={classes.row}> {temp} </Grid>);
				setMatches(k);
			} 
		}
		else{
			setMatches("Loading ...");
		}
	}, [userData, setMatches]);


	return ( 
	<div >
		<br />
		<br />
		<Box className={classes.title}>
		<Typography variant="h3"> 
			View Your Matches
		</Typography>
		</Box>
		<br /> <br />
		<div role="MatchPage" className="MatchPage" display="flex">
			<Grid 
				container
				item
				spacing={1}
				xs={12}
				direction="column"
				justify="center"
				alignItems="center"
				className={classes.grid}>
				{matches}
			</Grid>
		</div>
	</div>
	);
}


export default MatchPage;
