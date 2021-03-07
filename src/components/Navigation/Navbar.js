import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Container
} from "@material-ui/core";
import { useAuth } from '../../services/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    whiteSpace: `nowrap`
  },
  logo: {
    color: `white`,
    justifySelf: `start`,
    marginLeft: `20px`,
    cursor: `pointer`,
    fontSize: `2rem`,
    display: `flex`,
    alignItems: `center`,
    whiteSpace: `nowrap`
  }
}));

const navLinks = [
  { title: `Matches`, path: `/matches` },
  { title: `Profile`, path: `/profile` },
];
/**
 * @typedef {Object} Navbar
 * @prop {String} uid          - The unique id of the currently logged in user 
 * @prop {String} signInOrOut  - The label for the sign in/out button
 */

/**
 * @class
 * @classdesc Component for navigation throughout the site, providing links to all areas the user can access
 * @extends React.Component
 */
const Navbar = () => {
  const classes = useStyles();
  const { logout, uid } = useAuth();
  let signInOrOut = uid ? `Sign Out` : `Sign In`;
 
  /**
   * @memberof Navbar
   * @function handleLogout
   * @description Called to logout the user if they are logged in
   * @instance
   */
  async function handleLogout() {
    if (!uid) {
      return;
    }
    try {
      await logout();
    } catch {
      throw Error('failed to log out')
    }
  };

  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Container  className={classes.navbarDisplayFlex}>
          <Link to="/" className={classes.logo}>
             Capitalist Hinge
          </Link>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => (
              <Link to={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
            <Link to="/" key={signInOrOut} className={classes.linkText}>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary={signInOrOut} />
                </ListItem>
              </Link>
          </List>
        </Container>
      </Toolbar>
    </AppBar>
    </nav>
  );
}

export default Navbar;
