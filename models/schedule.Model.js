// Đặt Sân Bóng
const db = require('../configs/connectDatabase');
const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schedule= new Schema({
   
    sanbong :{
        type: Schema.Types.ObjectId,
        ref : "Pitches",
    },
    
    renter :[
        // Người Thuê
        {type: Schema.Types.ObjectId, ref : "User"}
    ],
    ngayThue :{
        type : Date,

    },
    thoiluongThue:{
        type : Date,
    },
    ngaytao :{
        type: Date,
        default : Date.now(),

    }


    
})

schedule.plugin(mongoosePaginate);
const lichDatSan = mongoose.model('schedule', schedule);

class lichDatSan_Database{
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
            return t = await myData.save();
            // update lại trang thái sân từ 0 -> 1
            //await lichDatSan.findOneAndUpdate({sanbong : t._id},{status : 1})
        }
        
    }
    //
}
module.exports = {
   
   
};