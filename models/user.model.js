let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// User basic info
let userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        unique: true
    },
    fullname: String,
    birthday: Date,
    registerDate: { type: Date, default: Date.now },
    gender: {type: Number, default: 1},
    profilePicture: String,
    phoneNumber: Number,
    userRole: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
    listFriends: [{ type: Schema.Types.ObjectId, ref: ModelName }]
})

// User role
let userRole = [
    { id: 0, name: 'banned' },
    { id: 1, name: 'member' },
    { id: 3, name: 'admin' },
    { id: 4, name: 'moderator' }
]

// Notification

// Login google

// Login facebook

class UserClass {
    static createUserWithEmail(info, callback) {
        if(typeof info == undefined || typeof info.email == undefined || typeof info.password == undefined){
            return
        }
    }
}



userSchema.loadClass(UserClass)
let ModelName = 'UserModel';
let UserModel = mongoose.model(ModelName, userSchema);

module.exports = UserModel;
module.exports.ModelName = ModelName;

