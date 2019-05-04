const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PitchModel = require("./pitches.model");
const UserModel = require("./user.model");
const PitchModelName = PitchModel.ModelName;
const UserModelName = UserModel.modelName;

var scheduleSchema = new Schema({
    pitch: {
        type: Schema.Types.ObjectId,
        ref : PitchModelName
    },
    renter: {
        type: Schema.Types.ObjectId,
        ref: UserModelName
    },
    rentDate: {
        type: Date,
    },
    rentTime: {
        type : String,
    },
    lasting: {
        type : String,
    },
    orderDate: {
        type: Date,
        default : Date.now(),
    }
})

const ModelName = "Schedule";
const ScheduleModel = mongoose.model(ModelName, scheduleSchema);
module.exports = ScheduleModel;

// module.exports = class ScheduleClass {
//     constructor(data){
//         this.data = data;
//     }
//     async getAllSchedule() {
//         let schedules = await ScheduleModel.find({}).sort({ngaytao : -1})
//         return schedules;
//     }
//     async addSchedule() {
//         if(this.data) {
//             let newSchedule = new ScheduleModel(this.data)
//             let t = await newSchedule.save();
//             // update lại trang thái sân từ 0 -> 1
//             await Sanbong.findByIdAndUpdate({_id : t._id},{status : 1})
//             let show_data = await lichDatSan.findOne({_id :t.id}).populate('sanbong')
//             return show_data;
//         }
//     }
// }
