import React, { useReducer } from 'react';
import StateReducer from "../components/StateReducer";
import "../style/LandingPage.css"
import Form from "../components/Form"
import connection from "../API/api"

const LandingPage = () =>{
  const [ userIdState, userIdDispatch ]= useReducer(StateReducer);

  connection.on("connect", () => {
    const salon= localStorage.getItem('salon')
    connection.emit("join", salon)
    userIdDispatch({type: 'userId', payload: connection.id}) 
  });

  return(   
      <div className='home'>
          <div className="block_1"> 
              <h1>Bienvenue sur ChatApp !</h1>
              <Form/>        
          </div>
          <div className="block_2">
            un logo ici c'est sympa
          </div>
      </div>
  )
}
export default LandingPage;
