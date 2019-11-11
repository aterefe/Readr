import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // container: {
  //   height: 100,
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  container: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: 4,
  },
}));

function FollowForm({ handleIdChange, handleFollowClick, followerID }) {
  const classes = useStyles();

  return (
    <form className={classes.container}>
      <div className={classes.input}>
        <TextField
          id="outlined-number"
          label="User ID"
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          name="followerID"
          value={followerID}
          onChange={handleIdChange}
          helperText="Enter user's ID to follow them"
          margin="normal"
          variant="outlined"
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleFollowClick}
        >
            Add
        </Button>
      </div>
    </form>
  );
}

export default FollowForm;
