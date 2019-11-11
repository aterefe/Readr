import React from 'react';
import axios from 'axios';
import {
 Typography, Paper, Tab, Tabs, CircularProgress,
} from '@material-ui/core';
import FollowTabs from './FollowTabPanel.jsx';

class FollowingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: null,
      following: null,
      followerID: '',
    };

    this.getFollowers = this.getFollowers.bind(this);
    this.getFollowing = this.getFollowing.bind(this);
    this.resetIdState = this.resetIdState.bind(this);
    this.handleFollowClick = this.handleFollowClick.bind(this);
    this.handleUnfollowClick = this.handleUnfollowClick.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getFollowers();
    this.getFollowing();
  }

  // Request to server to get a new book suggestion
  getFollowers() {
    return axios.get('/readr/followers')
      .then((followers) => {
        console.log(followers.data);
        this.setState({ followers: followers.data });
      })
      .catch((error) => console.log(error));
  }

  getFollowing() {
    return axios.get('/readr/following')
      .then((following) => {
        console.log(following.data);
        this.setState({ following: following.data });
      })
      .catch((error) => console.log(error));
  }

  handleFollowClick() {
    const { followerID } = this.state;
    return axios.post(`/readr/follow/${followerID}`)
      .then(() => {
        this.resetIdState();
        this.componentDidMount();
      })
      .catch(() => {
        this.resetIdState();
        this.componentDidMount();
        //  if there is not a user with that id, we want to send back
      });
  }

  handleUnfollowClick(followerID) {
    return axios.post(`/readr/unfollow/${followerID}`)
      .then(() => {
        this.resetIdState();
        this.componentDidMount();
      })
      .catch((error) => console.log(error));
  }

  handleIdChange(e) {
    this.setState({
      followerID: e.target.value,
    });
  }

  resetIdState() {
    this.setState({
      followerID: '',
    });
  };


  render() {
    const { followers, following, followerID } = this.state;
    return (
      <div>
        <div>
          <Paper>
            <FollowTabs
              followers={followers}
              following={following}
              followerID={followerID}
              handleFollowClick={this.handleFollowClick}
              handleUnfollowClick={this.handleUnfollowClick}
              handleIdChange={this.handleIdChange}
            />
          </Paper>
        </div>
      </div>
    );
  }
}

export default FollowingView;
