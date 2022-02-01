const mongoose=require ('mongoose');

const salonSchema= mongoose.Schema({
  name:    { type: String, unique= true },
  creator: { type: String }
}); 

module.exports= mongoose.model('messages', salonSchema);