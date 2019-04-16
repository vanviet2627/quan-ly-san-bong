const db = require('../configs/connectDatabase');
const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var sanbong = new Schema({
   
    
    loaisan :{
        type : Number,
        /* 5: Sân 5 người
           7: Sân 7 người
           12:Sân 12 người
        */
    },
    
    // path :{
    //     type: String,
    //     slug : ["tenSanBong"],
    //     unique: true
     
    // },
    status :{
        // Trạng thái
        type:Number,
        default:0,     
        /* Trạng thái 0 : Chưa Thuê
                      1 : Chưa Hết thời Gian Thuê
        */
    },
    renter :[
        // Người Thuê
        {type: Schema.Types.ObjectId, ref : "User"}
    ],
    ngaytao :{
        type : Date,
        default:Date.now(),
    },
    images :{
        type:String ,
    }


    
})

sanbong.plugin(mongoosePaginate);
const Sanbong = mongoose.model('Pitches', sanbong);
module.exports =class Pitches_Database{
    constructor(data){
        this.data = data
    }
    async save_pitches() {
        let myData = new Sanbong(this.data);
        return await myData.save()
         
    }
    del_pitches(){
        let myData_slug = this.data.slug;
        Sanbong.findOneAndRemove({slug : myData_slug})
                .then(rs =>{
                    if(rs){
                        res.sendStatus(200).json(rs)
                    }
                })
                .catch(err =>{
                    res.sendStatus(400).json(err)
                })
        
    }
    async update_pitches(){
        let myData_id = this.data.id;
        let t =await Sanbong.findOneAndUpdate({_id : myData_id})

              
    }
    async show_pitches(){
        // hiện thị sân bóng chưa đặt
       
        let t = await Sanbong.find({
            
        })
        return t
    }
}
module.exports.Sanbong=Sanbong 
