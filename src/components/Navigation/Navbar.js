import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container
} from "@material-ui/core";
import { Home, LinkOffOutlined } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';

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
  { title: `TestEditProfilePopup`, path: `/test-edit-profile-popup` },
  { title: `Matches`, path: `/matches` },
  { title: `Profile`, path: `/profile` },
  { title: `Sign In`, path: `/` },
];

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const classes = useStyles();
  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Container  className={classes.navbarDisplayFlex}>
          <Link to="/" className={classes.logo} onClick={closeMobileMenu}>
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
          </List>
        </Container>
      </Toolbar>
    </AppBar>
    </nav>
  );
}

export default Navbar;
