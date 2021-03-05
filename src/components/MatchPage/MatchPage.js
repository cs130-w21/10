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

function MatchPage() {
	const classes = useStyles();
	const [matches, setMatches] = useState("Loading...");
	const {userData} = useAuth();


	useEffect(() => {
		if(userData)
		{
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
		<div className="MatchPage" display="flex">
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