let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// User basic info
let userSchema = Schema({
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        // unique: true
    },
    phoneNumber: Number,
    userType: { type: String, default: "member" }
})

class UserClass {
    constructor(info){
        this.info = info;
    }
    async addUser() {
        if(this.info){
            let newUser = new UserModel(this.info);
            return await newUser.save();
        }
    }
    async findOneUser() {
        if(this.info){
            console.log(this.info)
            return await UserModel.findOne({email: this.info.email});
        }
    }
    async getAllUser() {
        return await UserModel.find({});
    }
}

let ModelName = 'User';
let UserModel = mongoose.model(ModelName, userSchema);

module.exports.UserModel = UserModel;
module.exports.ModelName = ModelName;
module.exports = UserClass;