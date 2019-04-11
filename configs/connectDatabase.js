let mongoose = require('mongoose');
require('dotenv').config();
const db_url = process.env.DB_LOCALHOST || process.env.DB_MLAB;

class Database {
    constructor(){
        this._connect();
    }
    _connect(){
        mongoose.connect( db_url, { useNewUrlParser: true })
            .then(() => console.log("Database connected!"))
            .catch((err) => console.log("Database connect error!" + err))
    }
}
module.exports = new Database;
