const express = require('express');
const cors = require ('cors');
const http = require("http");
const indexRoute = require("./routes/index");
require ("dotenv").config();
const mongoose = require ('mongoose');
const port = 4000;

const app = express(); 

let corsOptions={
  origin: 'http://localhost:3000'
}
 
app.use(cors(corsOptions));  
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  
app.use('/', indexRoute);
  
const httpServer = http.createServer(app);
const io = require ("socket.io")(httpServer,{ cors:{
  origin: ['http://localhost:3000']  
}});  
  
io.on("connection", (socket)=>{
  console.log('New User Connected', socket.id); 

  socket.on("setPseudo", (pseudo)=>{
    socket.username=pseudo
  })

  socket.on("join", (salon)=>{
    socket.join(salon)
    socket.to(salon).emit("receive-message", socket.id + " a rejoint le salon")  
  })

  socket.on("displayUsers",()=>{ 
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.username 
      }); 
    } 
    socket.emit("users", users);
    users.length=0; 
  }) 
       
  socket.on("send-message", (message, salon)=>{ 
    if(salon === ""){
      socket.broadcast.emit("receive-message", message)  
    }
    else{
      socket.to(salon).emit("receive-message", message)  
      console.log(message)  
    }
  }) 

  socket.on("leave", salon=>{ 
    socket.leave(salon);
    socket.to(salon).emit("receive-message", socket.id + " a quitté le salon"); 
  })
}) 
httpServer.listen(port,()=>{ 
  console.log("Server listening on port: "+ port);  
})

//Connexio à la DB 
const connect = process.env.connect;
mongoose.connect(connect, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Connexion à MongoDB réussie!'))
.catch(()=>console.log('Connexion à MongoDB échouée!')); 


