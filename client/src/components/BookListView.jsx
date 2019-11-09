/* Renders the list of either the "to-Read" or "not-interested" books.
 * Here we map over the users collection retrieved from the database and render a BookListItem.
 * A user can sort their list by date added or genre.
 */
import React from 'react';
import axios from 'axios';
import { Typography, CircularProgress } from '@material-ui/core';

class BookListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: null,
      userID: props.user.id,
    };

    this.getUserBookList = this.getUserBookList.bind(this);
  }

  componentDidMount() {
    this.getUserBookList();
  }

  // Request to server to get a new book suggestion
  getUserBookList() {
    const { userID } = this.state;
    console.log(userID);
    return axios.get('/readr/booklist', {
      userID,
      toRead: true,
    })
      .then((books) => {
        this.setState({ bookList: books.data });
      });
  }


  render() {
    const { bookList } = this.state;
    return (
      // map over the userbooklist and render each an bookListItem
      <div>
        {bookList === null ? (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              transform: 'translate(-50%, -40%)',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div>
            {/* mapp over each item in book list and display */}
            {Object.values(bookList)}
          </div>
        )}
      </div>
    );
  }
}

export default BookListView;
