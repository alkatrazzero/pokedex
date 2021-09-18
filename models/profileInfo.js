const {Schema,  model, Types} = require("mongoose");
const schema = new Schema({
  name:{type:String},
  age:{type:Number},
  instagram:{type:String},
  aboutMe:{type:String},
  email:{type:String},
  owner:{type:Types.ObjectId,ref:'User'},
})
module.exports = model('ProfileInfo', schema)
