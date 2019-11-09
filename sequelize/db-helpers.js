const models = require('./index');


// ----------BOOKS----------
// Takes a book object and creates a new books
const insertBook = (book) => models.Book.create({
  isbn: book.isbn,
  title: book.title,
  author: book.author,
  description: book.description,
  coverURL: book.coverURL,
});

// Takes an identifying number and returns the book info
const findBook = (isbn) => models.Book.findOne({
  where: {
    isbn,
  },
});


// ----------USER_PREFERENCES----------
const defaultPref = 0.50;
// Takes the userID and creates the default preferences for the user
const createPreferences = (userID) => models.UserPreference.create({
  userID,
  comedy: defaultPref,
  thriller: defaultPref,
  fantasy: defaultPref,
  romance: defaultPref,
});

// Takes a userID, the subject of the book, and the toRead boolean and updates the preferences
const updatePreferences = (userID, subject, toRead) => {
  // Update the user preferences where userID matches and modify subject based on math
  // (toRead is boolean of which list for positive or negative change)
};

// Takes a userID and returns the user preferences
const getPreferences = (userID) => models.UserPreference.findOne({
  where: {
    userID,
  },
});

// ----------USER_BOOKS----------
// Takes a userID and a toRead boolean and returns list of all books on toRead / not toRead list
const userBookList = (userID, toRead) => models.UserBook.findAll({
  where: {
    userID,
    is_interested: toRead,
  },
});

const createUserBook = (userID, isbn, toRead) => models.UserBook.create({
  userID,
  isbn,
  is_interested: toRead,
});

// update the user's interest in a book. Update takes two parameters -
// first one is values which will be used to perform the update, and second one is options
const changeUserInterest = (userID, isbn, toRead) => models.UserBook.update({
  where: {
    userID,
    isbn,
  },
  is_interested: toRead,
});

const verifyUserBook = (userID, isbn) => models.userBook.findOne({
  where: {
    userID,
    isbn,
  },
});

// ----------FOLLOWERS----------
// Follow user
const followUser = (userID, followerID) => models.UserFollower.create({
  userID,
  followerID,
});

const unfollowUser = (userID, followerID) => models.UserFollower.destroy({
  where: {
    userID,
    followerID,
  },
});

// Get list of users you are following
const getFollowing = (userID) => models.UserFollower.findAll({
  attributes: ['followerID'],
  where: {
    userID,
  },
})
  .then((connectionData) => connectionData.map(
    (connectionInfo) => connectionInfo.dataValues.followerID,
  ))
  .then((userIDs) => models.User.findAll({
    attributes: ['username'],
    where: {
      id: userIDs,
    },
  }))
  .then((users) => users.map(
    (user) => user.username,
  ));

// Get list of users following you
const getFollowers = (userID) => models.UserFollower.findAll({
  attributes: ['userID'],
  where: {
    followerID: userID,
  },
})
  .then((connectionData) => connectionData.map(
    (connectionInfo) => connectionInfo.dataValues.userID,
  ))
  .then((userIDs) => models.User.findAll({
    attributes: ['username', 'id'],
    where: {
      id: userIDs,
    },
  }));

const createUser = (username, googleId) => models.User.create({
  username,
  googleId,
});

module.exports.insertBook = insertBook;
module.exports.findBook = findBook;
module.exports.createPreferences = createPreferences;
module.exports.updatePreferences = updatePreferences;
module.exports.getPreferences = getPreferences;
module.exports.userBookList = userBookList;
module.exports.createUserBook = createUserBook;
module.exports.verifyUserBook = verifyUserBook;
module.exports.changeUserInterest = changeUserInterest;
module.exports.followUser = followUser;
module.exports.unfollowUser = unfollowUser;
module.exports.getFollowing = getFollowing;
module.exports.getFollowers = getFollowers;
module.exports.createUser = createUser;
