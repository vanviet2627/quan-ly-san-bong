let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let pitchSchema = new Schema({
  name: String,
  size: Number,
  isUsed: Boolean
})

let modelName = "PitchModel";
let pitchModel = mongoose.model(modelName, pitchSchema);

module.exports = pitchModel;
module.exports.ModelName = modelName;