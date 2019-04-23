let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// User basic info
let UserSchema = Schema({
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
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    registerDate: { type: Date, default: Date.now },
    userType: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
})

// User role
let UserType = [
    { id: 0, name: 'banned' },
    { id: 1, name: 'member' },
    { id: 3, name: 'admin' }
]

class UserClass {
    constructor(data){
        this.data = data;
    };
    async addUserByPhoneNumber() {
        if(this.data){
            let newUser = new UserModel(this.data);
            await newUser.save()
                .then(rs => { return {"success": true}})
                .catch(err => { return {"success": false, "err": err}})
        }
    }
}

// Notification

// Login google

// Login facebook

let ModelName = 'UserModel';
let UserModel = mongoose.model(ModelName, UserSchema);

module.exports.ModelName = ModelName;
module.exports.UserType = UserType;
module.exports.UserClass = UserClass; 
module.exports = UserModel; 


