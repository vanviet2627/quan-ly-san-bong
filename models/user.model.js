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
    },
    phoneNumber: Number,
    userType: { type: String, default: "member" },
    registerDate: Date.now()
})
UserSchema.methods.validPassword = function(password) {
    return ( this.password === password );
};

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
    async findOneUserByEmail() { // Input: email _ Output: User Obj
        if(this.info){
            console.log(this.info)
            return await UserModel.findOne({email: this.info});
        }
    }
    async getAllUser() {
        return await UserModel.find({});
    }
}

let ModelName = 'User';
let UserModel = mongoose.model(ModelName, UserSchema);

module.exports = UserClass;
module.exports.UserModel = UserModel;
module.exports.ModelName = ModelName;