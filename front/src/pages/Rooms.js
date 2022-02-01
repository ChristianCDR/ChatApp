import React, { useState, useEffect } from "react";
import "../style/rooms.css";
import { useForm } from 'react-hook-form';
import connection from "../API/api";
import { useNavigate } from 'react-router-dom';

const Rooms = () => {
  const { register, handleSubmit } = useForm();
  const [ pseudo, setPseudo ]= useState("");
  const [ salon, setSalon ]= useState("");
  const [ userId, setUserId ]= useState("");

  let navigate= useNavigate();

  const saveMessage= (message)=>{
    let myInit={
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pseudo: pseudo, salon: salon, userId: userId, message: message })
    }
    fetch("http://localhost:4000/message", myInit)
    .then(res=>{
      if(res.ok){
        res.json()
        console.log(res);
      }
    })
    .catch(error=> console.log(error))
  }
  const leaveChannel= (e)=>{
    e.preventDefault()
    connection.emit("leave", salon)
    navigate("/");
  }

  useEffect(()=>{
    setPseudo(localStorage.getItem('pseudo'));
    setSalon(localStorage.getItem('salon'));
    setUserId(localStorage.getItem('userId'));

    const displayMessages=(data)=>{ 
      let messagesDiv=document.querySelector(".messages");
      let newMessages= document.createElement("div");
      newMessages.textContent= data;
      messagesDiv.appendChild(newMessages);
    } 

    connection.on("receive-message", msg=>{
      displayMessages(msg);
    })

    connection.emit("displayUsers");  

    connection.on("users", (users) => { 
      users.forEach((user) => {
        let usersDiv=document.querySelector(".users");
        let usersList= document.createElement("div"); 
        usersList.textContent=user.username + ": " + user.userID;
        usersDiv.appendChild(usersList);
      });
    });

    fetch("http://localhost:4000/message")
    .then(res=>{ 
      if(res.ok){
        res.json()
        .then((body)=>{
          body.forEach(elt=>{
            displayMessages(elt.message)
          })
        })
        .catch(error=> console.log(error)) 
      } 
    })
    .catch(error=> console.log(error))

  },[]) 

  return ( 
        <div className="container">
            <aside> 
              <strong>Salons: </strong> <br />
              { salon }
            </aside>
            <main>
              <div className="head"> 
                <strong>{ salon }</strong>
                <form onSubmit={leaveChannel} className="form1">
                  <button type="submit" aria-label="leave channel button" className="leaveButton">Quitter le salon</button>
                </form>
              </div>
              <div className="messages"></div>
              <form onSubmit={handleSubmit(data=>{
                connection.emit("send-message", data.message, salon);
                saveMessage(data.message);
              })} >
                <label>
                  <input {...register("message")} type="text" name="message" id="message" placeholder="Votre message"/>
                </label>
                <button type="submit" aria-label="submit button" className="sendButton">Envoyer</button>
              </form>
            </main>
            <aside className="users">
                <strong>Utilisateurs: </strong><br/> 
            </aside>
        </div>
   );
}
export default Rooms;