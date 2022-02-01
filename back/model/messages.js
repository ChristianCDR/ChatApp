const mongoose=require ('mongoose');

const msgSchema= mongoose.Schema({
  salon:    { type: String },
  message:  { type: String },
  pseudo:   { type: String },
  userId:   { type: String }
}); 

module.exports= mongoose.model('messages', msgSchema);