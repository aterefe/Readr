/* Renders the list of either the "to-Read" or "not-interested" books.
 * Here we map over the users collection retrieved from the database and render a BookListItem.
 * A user can sort their list by date added or genre.
 */
import React from 'react';


function BookListView(props) {
  const { userBookList } = props;
  return (
    // map over the userbooklist and render each an bookListItem
    <div>BOOK LIST VIEW</div>
  );
}

export default BookListView;
