const userModel = require ("../model/userData");
const salonModel = require ('../model/salon');

exports.setDatas=(req, res)=>{
  const newUser= new userModel({
    pseudo:req.body.pseudo, 
    salon:req.body.salon
  });

  newUser.save()
  .then(()=>res.status(201).json({message:'Nouvel utilisateur crée!'})) 
  .catch(error=> {res.status(501).json({messagefromUserSaving: error})});
}

exports.setMessages=(req, res)=>{
  const newMessage= new salonModel({
    salon: req.body.salon,
    pseudo:req.body.pseudo,
    message:req.body.message,
    userId: req.body.userId
  });
  newMessage.save()
  .then(()=>res.status(201).json({message:'Nouveau message enregistré!'})) 
  .catch(error=> {res.status(501).json({messagefromMessageSaving: error})});
}

exports.getMessages =(req, res)=>{
  salonModel.find() 
  .then(responses =>{res.status(200).json(responses)})
  .catch(error=>{res.status(400).json({error})});
}