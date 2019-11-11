import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

// a single user that follows the main user
function UserFollower(props) {
  const classes = useStyles();
  const { user} = props;
  console.log(user);
  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {user.username}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {user.id}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Typography color="primary" variant="body2" style={{ cursor: 'pointer' }} onClick={() => handleBlockUser(user.id)}>
                  Block User
                </Typography>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default UserFollower;
