// Đặt Sân Bóng
const db = require('../configs/connectDatabase');
const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const Sanbong = require('../models/pitches.Model').Sanbong
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schedule= new Schema({
   
    sanbong :{
        type: Schema.Types.ObjectId,
        ref : "Pitches",
    },
    
    renter :{
        // Người Thuê
        type : String,
        default:'admin',
    },
    ngayThue :{
        type : String,

    },
    dattu:{
        type : String,
    },
    thoiluongThue:{
        type : String,
    },
    ngaytao :{
        type: Date,
        default : Date.now(),

    }


    
})

schedule.plugin(mongoosePaginate);
const lichDatSan = mongoose.model('schedule', schedule);

module.exports = class lichDatSan_Database{
    constructor(data){
        this.data = data
    }
    // xem Tất cả Lịch đặt Sân 
    async view_schedule(){
        let myData = await lichDatSan.find({})
                                     .sort({ngaytao : -1})
        return myData

    }
    // thêm lịch đặt sân
    async add_schedule(){
        if(this.data){
            let myData = new lichDatSan(this.data)
            let t = await myData.save();
            // update lại trang thái sân từ 0 -> 1
            await Sanbong.findOneAndUpdate({_id : t._id},{status : 1})
            return t;
        }
        
    }
    
}
