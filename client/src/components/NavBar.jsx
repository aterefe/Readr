/* This is the header or top bar component.  It is pretty static.
 * Includes navigatin links- App logo Title  2. link to "To-Read" list,
 * 3. "Explore Books" (new book suggestion), 4. Logout button.
 */
import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

// This allows custom styling of the links, over-riding the root theme
const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1),
    color: 'white',
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const { username } = props.user;
  const firstName = username.split(' ')[0];
  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="button" style={{ flex: 1 }}>
            Welcome {firstName}!
          </Typography>
          <Typography>
            <Link to="/suggestion" className={classes.link}>
              Explore Books
            </Link>
            <Link to="/toread" className={classes.link}>
              To-Read
            </Link>
            <Link to="/following" className={classes.link}>
              Following
            </Link>
            {/* This directs to passport auth logout */}
            <a href="/auth/logout" className={classes.link}>Logout</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
