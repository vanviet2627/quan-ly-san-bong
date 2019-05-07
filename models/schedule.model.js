const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pitch = require("./pitches.model");
const User = require("./user.model");
const PitchModelName = Pitch.ModelName;
const PitchModel = Pitch.PitchModel;
const UserModelName = User.ModelName;

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
    createTime: {
        type: Date,
        default : Date.now(),
    }
})

class ScheduleClass {
    constructor(data){
        this.data = data;
    }
    async getAllSchedule() {
        return await ScheduleModel.find({}).populate('pitch').populate('renter').sort({createTime: -1})
    }
    async getListScheduleByUserId() {
        return await ScheduleModel.find({ renter: this.data }).populate('pitch').populate('renter').sort({createTime: -1})
    }
    async addSchedule() {
        if(this.data.rentDate && this.data.rentTime && this.data.renter && this.data.pitch && this.data.lasting) {
            // Find available `pitch`
            await new Pitch(this.data.pitch).findAvailablePitchByPitchSize().then(pitchId => {
                this.data.pitch = pitchId;
            }).catch(err => {
                throw new Error(err);
            })

            // Get email from login session
            await new User(this.data.renter).findOneUserByEmail().then(user => {
                this.data.renter = user._id;
            })

            // Save new schedule
            let savedSchedule = await new ScheduleModel(this.data).save();
            console.log({saveOK: savedSchedule});
            
            let check = await new Pitch(savedSchedule.pitch).checkedPitch();
            console.log({checkOK: check});
            
            let rs = await ScheduleModel.findOne({_id: savedSchedule._id}).populate('pitch').populate('renter');
            console.log({KQ: rs});
            return rs;
        } else
            throw new Error("Thiếu thông tin đặt sân!");
    }


    // addSchedule() {
    //     return new Promise((resolve, reject) => {
    //         if(this.data.rentDate && this.data.rentTime && this.data.renter && this.data.pitch && this.data.lasting) {
    //             // Check `pitch` available
    //             new Pitch(this.data.pitch).findAvailablePitch().then(pitchId => {
    //                 this.data.pitch = pitchId;
                    
    //                 // Call user email

    //                 let newSchedule = new ScheduleModel(this.data)
    //                 newSchedule.save((err, docs) => {
    //                     if(!err) {
    //                         // Update lại trang thái sân thành đã đặt (0 -> 1)
    //                         PitchModel.findByIdAndUpdate({_id: docs._id},{status: 1}).exec((err, updatePitchStatusSuccess) => {
    //                             if(!err) {
    //                                 ScheduleModel.findOne({_id :t.id}).populate(PitchModelName).exec((err, savedSchedule) => {
    //                                     console.log({RESULT: savedSchedule});
                                        
    //                                     if(!err) resolve(savedSchedule);
    //                                     else reject(err);
    //                                 })
    //                             } else reject(err);
    //                         })
    //                     } else reject(err);
    //                 });
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //         } else reject ("Thiếu thông tin đặt sân!");
    //     })
    // }
}

const ModelName = "Schedule";
const ScheduleModel = mongoose.model(ModelName, scheduleSchema);

module.exports = ScheduleClass;
module.exports.ScheduleModel = ScheduleModel;