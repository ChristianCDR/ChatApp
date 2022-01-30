import React, { useState, useEffect } from "react";
import "../style/rooms.css";
import { useForm } from 'react-hook-form';
import connection from "../API/api";

const Rooms = () => {
  const { register, handleSubmit } = useForm();
  const [ pseudo, setPseudo ]= useState("");
  const [ salon, setSalon ]= useState("");
  const [ userId, setUserId ]= useState("");

  useEffect(()=>{
    setPseudo(localStorage.getItem('pseudo'));
    setSalon(localStorage.getItem('salon'));
    setUserId(localStorage.getItem('userId'));

    connection.on("receive-message", msg=>{
      let messagesDiv=document.querySelector(".messages");
      let newMessages= document.createElement("div");
      newMessages.textContent= msg;
      messagesDiv.appendChild(newMessages);
    })

    fetch("http://localhost:4000/message")
    .then(res=>{
      if(res.ok){
        res.json()
        .then((body)=>{console.log(body[0].message)})
        .catch(error=> console.log(error)) 
      }
    })
    .catch(error=> console.log(error))

  },[]) 

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

  return (
        <div className="container">
            <aside>
              Salons: <br />
              { salon }
            </aside>
            <main>
              <div>{ salon }</div>
              <div className="messages"></div>
              <form onSubmit={handleSubmit(data=>{
                connection.emit("send-message", data.message, salon);
                saveMessage(data.message);
              })} >
                <label>
                  <input {...register("message")} type="text" name="message" id="message" placeholder="Votre message"/>
                </label>
                <button type="submit" aria-label="submit button">Envoyer</button>
              </form>
            </main>
            <aside>
                Utilisateurs: <br/>       
              { pseudo } : { userId }
            </aside>
        </div>
   );
}
export default Rooms;