const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var PitchSchema = new Schema({
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
    }
})

class PitchClass {
    constructor(data){
        this.data = data
    }
    async addPitch() {
        return await new PitchModel(this.data).save();
    }
    async findAvailablePitchByPitchSize() { // Input: Pitch.pitchSize _ Output: pitchId available or null
        return new Promise((resolve, reject) => {
            if(this.data) {
                let pitches = PitchModel.find({pitchSize: this.data}).exec((err, pitches) => {
                    if(pitches === undefined || pitches.length === 0) {
                        reject("Sân không tồn tại!");
                    } else {
                        pitches.forEach(pitch => {
                            if(pitch.status == 0) {
                                resolve(pitch._id);
                            }
                        });
                        reject("Hết sân!");
                    }
                })
            }
        })
    };
    async checkedPitch() {
        return await PitchModel.findByIdAndUpdate({_id: this.data}, {status: 1});
    };
    async uncheckAllPitch() {
        await PitchModel.find().then(pitches => {
            pitches.forEach(async pitch => {
                await PitchModel.findOneAndUpdate({_id: pitch._id}, {status: 0});
            })
        })
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
    async update_pitches() {
        let myData_id = this.data.id;
        let t = await PitchModel.findOneAndUpdate({_id : myData_id})
    }
    async show_pitches() {
        // hiện thị sân bóng chưa đặt
        return await PitchModel.find({})
    }
}


let ModelName = 'Pitch';
PitchSchema.plugin(mongoosePaginate);
const PitchModel = mongoose.model(ModelName, PitchSchema);

module.exports = PitchClass;
module.exports.PitchModel = PitchModel;
module.exports.ModelName = ModelName;
