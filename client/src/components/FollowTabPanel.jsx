import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FollowForm from './FollowForm.jsx';
import UserFollower from './UserFollower.jsx';
import UserFollowing from './UserFollowing.jsx';


function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function FollowTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const {
    followers,
    following,
    followerID,
    handleUnfollowClick,
    handleFollowClick,
    handleIdChange,
  } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.tabs}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="Following" {...a11yProps(0)} />
          <Tab label="Followers" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <div>
          <FollowForm handleFollowClick={handleFollowClick} handleIdChange={handleIdChange} followerID={followerID} />
        </div>
        <br />
        {/* This is iterating over the Following List and populating each user onto the view */}
        {following === null || followers.length === 0 ? (
          <div>You are not following any users! </div>
        ) : (
          <div>
            {Object.keys(following).map((user) => (
              <UserFollowing user={following[user]} handleUnfollowClick={handleUnfollowClick} />))}
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {followers === null || followers.length === 0 ? (
          <div>No users are following you! </div>
        ) : (
          <div>
            {Object.keys(followers).map((user) => (
              <UserFollower user={followers[user]} />))}
          </div>
        )}
        {/* This is iterating over the Followers List and populating each user onto the view */}
      </TabPanel>
    </div>
  );
}
