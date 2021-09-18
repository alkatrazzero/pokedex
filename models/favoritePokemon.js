const {Schema,  model, Types} = require("mongoose");
const schema = new Schema({
  name:{type:String},
  base_experience:{type:Number},
  sprites:{type:Object},
  types:{type:Object},
  abilities:{type:Array},
  owner:{type:Types.ObjectId,ref:'User'}
})
module.exports = model('FavoritePokemon', schema)
