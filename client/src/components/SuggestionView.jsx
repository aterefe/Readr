/* This is the book suggestion view where the user sees the single book suggestion.
 * It is dynaic and update each time the user clicks "yes", "no", or "read now".
 * It renders a large image of the book cover along with description and the three button
 * choices above. The user should not see a book they have already said yes or no to.
 */
import React from 'react';
import { Typography } from '@material-ui/core';
import SuggestionButtons from './SuggestionButtons.jsx';
import testBook from './TestBook';


class SuggestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // this inherits the first book suggestion from the first app load and gets reset with each click
      bookSuggestion: testBook,
    };
    this.handleYesClick = this.handleYesClick.bind(this);
    this.handleNoClick = this.handleNoClick.bind(this);
    this.handleReadNowClick = this.handleReadNowClick.bind(this);
  }

  getBookSuggestion() {
    // return axios.get('/book').then((retrievedBook) => {
    //   return retrievedBook;
    // });

    const { bookSuggestion } = this.state;
    return bookSuggestion;
  }

  // allows more DRY code by not having this repeat inside the handleClicks
  newBookSuggestion() {
    this.getBookSuggestion();
    // .then((book) => {
    //   this.setState({ bookSuggestion: book });
    // });
  }

  /* Adds book to the logged in users "not interested" list by
  * sending a update request to the database.
  * Show the next book suggestion.
  */
  handleNoClick() {
    console.log('Clicked No');
    this.newBookSuggestion();
  }

  /* Adds book to the logged in users "to-read" list by
  * sending a update request to the database.
  * Show the next book suggestion.
  */
  handleYesClick() {
    console.log('Clicked Yes');
    this.newBookSuggestion();
  }

  handleReadNowClick() {
    console.log('Clicked Read Now!');
  }

  render() {
    const { bookSuggestion } = this.state;
    return (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <img src={bookSuggestion.volumeInfo.imageLinks.thumbnail} alt="Smiley face" />
        </div>
        <Typography variant="h6">
          {bookSuggestion.volumeInfo.title}: {bookSuggestion.volumeInfo.subtitle || null}
        </Typography>
        <Typography variant="subtitle1">{bookSuggestion.volumeInfo.authors || null} </Typography>
        <Typography variant="caption">
          {/* some books do not have descriptons so we'll use text snippet */}
          {bookSuggestion.volumeInfo.description || bookSuggestion.searchInfo.textSnippet || null}
        </Typography>
        <br />
        <div>
          <SuggestionButtons
            handleNoClick={this.handleNoClick}
            handleYesClick={this.handleYesClick}
            handleReadNowClick={this.handleReadNowClick}
          />
        </div>
      </div>
    );
  }
}

export default SuggestionView;
