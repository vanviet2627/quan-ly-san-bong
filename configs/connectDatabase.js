var mongoose = require('mongoose');
// const mlabURI = 'mongodb+srv://quanlysanbong:mTVUM1cd98aybmOC@cluster0-nzcja.mongodb.net/quanlysanbong?retryWrites=true';
const mlabURI = 'mongodb://localhost:27017/quanlysanbong';

class DatabaseConnect {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose.connect(mlabURI, {
      useNewUrlParser: true,
      useCreateIndex: true
    }).then(() => {
      console.log("Database connected!");
    }).catch(err => {
      console.log("Database connect error!" + err);
    })
  }
}

module.exports = new DatabaseConnect;