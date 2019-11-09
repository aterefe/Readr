const Sequelize = require('sequelize');

require('dotenv').config();

// need to add this so I can create a
// pull requests for this spefic file

const {
  DATABASE,
  USER_NAME,
  USER_PASSWORD,
  HOST,
  DB_PORT,
} = process.env;

const db = new Sequelize({
  database: DATABASE,
  username: USER_NAME,
  password: USER_PASSWORD,
  host: HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

// try to update null to a time
// creating the table for the user
const User = db.define('user', {
  username: Sequelize.STRING,
  googleId: Sequelize.STRING,
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
});

// creating the table for the books api informations
const Book = db.define('book', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  // },
  isbn: {
    type: Sequelize.STRING,
    unique: true,
  },
  title: {
    type: Sequelize.STRING,
    unique: false,
  },
  author: Sequelize.STRING,
  description: {
    type: Sequelize.STRING,
    unique: false,
  },
  cover: {
    type: Sequelize.STRING,
    unique: true,
  },
  url: {
    type: Sequelize.STRING,
    unique: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
});

// creating the field on the table
const UserFollower = db.define('user_follower', {
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
UserFollower.belongsTo(User);
// UserFollower has a field named userid that is from the field id in the user table
User.belongsToMany(User, { as: 'userid', through: UserFollower });
// UserFollower has a field named userid that is from the field id in the user table
User.belongsToMany(User, { as: 'followerID', through: UserFollower });

const UserBlocked = db.define('user_blocked', {
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
// userblocked is refrencing userFollower
UserBlocked.belongsTo(User);
// UserBlocked.belongsTo(UserFollower);
// UserFollower has a field named userid that is from the field id in the user table
User.belongsToMany(User, { as: "userID", through: UserBlocked });
// UserFollower has a field named blockedID that is from the field id in the user table
User.belongsToMany(User, { as: 'blockedID', through: UserBlocked });
// UserFollower.belongsToMany(UserFollower, { as: 'blockedID', through: UserBlocked });
// UserFollower.belongsToMany(UserFollower, { as: 'userID', through: UserBlocked, foreignKey: 'userID' });

// creating the fields on the table
const UserBook = db.define('user_book', {
  user_id: {
    type: Sequelize.INTEGER,
    refrence: {
      model: 'user',
      key: 'id',
    },
  },
  isbn: {
    type: Sequelize.INTEGER,
    refrence: {
      model: 'books',
      key: 'isbn',
    },
  },
  is_interested: Sequelize.BOOLEAN,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
// UserBook is refrencing User
UserBook.belongsTo(User);
// UserBook is refrencing Book
UserBook.belongsTo(Book);
// UserBooks has a field named userid that is from the field id in the user table
User.belongsToMany(Book, { as: 'user_id', through: UserBook, foreignKey: 'id' });
// UserBooks has a field named isbn that is from the field isbn in the Book table
Book.belongsToMany(User, { through: UserBook, foreignKey: 'isbn' });
// ^^Do not delete, needed to create join tables in sequalize

const UserPreference = db.define('user_preference', {
  userID: Sequelize.INTEGER,
  comedy: Sequelize.FLOAT,
  thriller: Sequelize.FLOAT,
  fantasy: Sequelize.FLOAT,
  romance: Sequelize.FLOAT,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

db.sync({ force: true })
  .then(() => {console.log('connected to database');})
  .catch((err) => { console.log(err); });

module.exports.User = User;
module.exports.Book = Book;
module.exports.UserFollower = UserFollower;
module.exports.UserBlocked = UserBlocked;
module.exports.UserBook = UserBook;
module.exports.UserPreference = UserPreference;
module.exports.db = db;
