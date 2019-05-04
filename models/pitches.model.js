const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var Pitch = new Schema({
    pitchName: {
        type: String,
        required: true,
        unique: true
    },
    pitchSize: { // 5 nguoi || 7 nguoi || 12 nguoi
        type : Number,
    },
    status: { // (!rented) ? 0 : 1
        type: Number,
        default: 0,     
    },
    renter: [
        {type: Schema.Types.ObjectId, ref : "User"}
    ]
})
let ModelName = 'Pitch';
Pitch.plugin(mongoosePaginate);
const PitchModel = mongoose.model(ModelName, Pitch);

module.exports = class PitchClass{
    constructor(data){
        this.data = data
    }
    async addPitch() {
        let myData = new PitchModel(this.data);
        return await myData.save()
    }
    del_pitches(){
        let myData_slug = this.data.slug;
        PitchModel.findOneAndRemove({slug: myData_slug})
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
        let t = await PitchModel.findOneAndUpdate({_id : myData_id})
    }
    async show_pitches(){
        // hiện thị sân bóng chưa đặt
        let t = await PitchModel.find({})
        return t
    }
}
module.exports.PitchModel = PitchModel;
module.exports.ModelName = ModelName;
