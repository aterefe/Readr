// Express router for all main features of the Readr app

const router = require('express').Router();
const {
  categorySearch,
  selectCategory,
  selectBook,
  getInfo,
} = require('./suggestion');
const dbHelpers = require('../sequelize/db-helpers');

const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect('/');
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  console.log(req.user.id);
  res.send(`you are logged in as: ${req.user.username}`);
});

router.get('/suggestion', (req, res) => {
  const { user } = req;
  // TODO: Get users personalized data as userPref
  // Select random category from user's personalized data
  const userPref = { comedy: 0.74, romance: 0.54, thriller: 0.21 }; // FIXME: temp data
  const category = selectCategory(userPref);
  const book = {};

  // Send search to that category
  categorySearch(category, 0)
    .then((books) => categorySearch(category, selectBook(books.ebook_count)))
    // Get total book count & Send request with offset set to a random number from the count
    .then((books) => {
      book.title = books.works[0].title;
      book.author = books.works[0].authors[0].name;
      return getInfo(book.title, book.author);
    })
    .then((bookInfo) => {
      // console.log(bookInfo);
      book.isbn = bookInfo.isbn;
      book.description = bookInfo.description;
      book.coverURL = bookInfo.coverURL;
      book.title = bookInfo.title;
      return dbHelpers.insertBook(book);
      // res.send(JSON.stringify(book));
    })
    .then(() => res.send(JSON.stringify(book)));
});

// Endpoint to return list of followers
router.get('/followers', (req, res) => {
  const { user } = req;
  dbHelpers.getFollowers(user.id)
    .then((followers) => {
      res.send(JSON.stringify(followers));
    });
});

// Endpoint to return list of users you are following and their id#
router.get('/following', (req, res) => {
  const { user } = req;
  dbHelpers.getFollowing(user.id)
    .then((following) => {
      res.send(JSON.stringify(following));
    });
});

// Endpoint to follow a user
router.post('/follow/:followerID', (req, res) => {
  const { user } = req;
  dbHelpers.followUser(user.id, req.params.followerID)
    .then(() => {
      res.send('successfully followed');
    });
});

// Endpoint to unfollow a user
router.post('/unfollow/:followerID', (req, res) => {
  const { user } = req;
  dbHelpers.unfollowUser(user.id, req.params.followerID)
    .then(() => {
      res.send('successfully unfollowed');
    });
});

router.post('/interest', (req, res) => {
  const { userID, isbn, toRead } = req.body;
  dbHelpers.createUserBook(userID, isbn, toRead)
    .then(() => {
      res.status(200).send('book added to user list');
    })
    .catch((error) => console.log(error));
});

router.get('/booklist', (req, res) => {
  const { userID, toRead } = req.body;
  dbHelpers.userBookList(userID, toRead)
    .then((bookList) => res.send(bookList))
    .catch((error) => console.log(error));
});
module.exports = router;
