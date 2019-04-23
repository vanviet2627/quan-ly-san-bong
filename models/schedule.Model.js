// Đặt Sân Bóng
const db = require('../configs/connectDatabase');
const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const PitchModel = require('../models/pitches.Model').PitchModel
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schedule= new Schema({
    sanbong: {
        type: Schema.Types.ObjectId,
        ref : "Pitches",
    },
    renter: {
        type: String,
        default: 'user@gmail.com',
    },
    ngayThue: {
        type: String,
    },
    dattu: {
        type: String,
    },
    thoiluongThue: {
        type: String,
    },
    ngaytao: {
        type: Date,
        default : Date.now(),
    }
})

schedule.plugin(mongoosePaginate);
const ScheduleModel = mongoose.model('schedule', schedule);

module.exports = class lichDatSan_Database{
    constructor(data){
        this.data = data
    }
    // xem Tất cả Lịch đặt Sân 
    async view_schedule(){
        let myData = await ScheduleModel.find({})
                                     .sort({ngaytao : -1})
        return myData

    }
    // thêm lịch đặt sân
    async add_schedule(){
        if(this.data){
            let newSchedule = new ScheduleModel(this.data)
            let t = await newSchedule.save();
            // update lại trang thái sân từ 0 -> 1
            await PitchModel.findByIdAndUpdate({_id: t._id},{status: 1})
            let show_data = await ScheduleModel.findOne({_id: t.id}).populate('sanbong')
            return show_data;
        }
        
    }
    
}
