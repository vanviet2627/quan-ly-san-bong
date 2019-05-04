const express = require('express');
const router = express.Router;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('./user.model').UserModel;

class AdminClass {
  constructor(data) {
    this.data = data;
  };
  async getAllUser() {
    return await UserModel.find();
  };
}

module.exports = AdminClass;