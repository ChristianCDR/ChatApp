const mongoose=require ('mongoose');
const mongooseUniqueValidator=require('mongoose-unique-validator');

const userSchema= mongoose.Schema({
  salon: {type: String},
  pseudo: {type: String, unique: true, required: true}
}); 
//S'assurer de l'unicité des pseudos
userSchema.plugin(mongooseUniqueValidator);
module.exports= mongoose.model('users', userSchema);