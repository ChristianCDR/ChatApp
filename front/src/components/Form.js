import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import StateReducer from "../components/StateReducer";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const [ pseudoState, pseudoDispatch ] = useReducer(StateReducer);
  const [ salonState, salonDispatch ] = useReducer(StateReducer);
  
  let navigate= useNavigate();

  return ( 
    <div>
      <form onSubmit={
        handleSubmit(data=>{
          pseudoDispatch({type:'pseudo', payload: data.pseudo})
          salonDispatch({type:'salon', payload: data.salon})
          navigate("/rooms");
          })
        } 
      >
        <label>
            Pseudo
            <input {...register("pseudo")} type="text" name="pseudo" id="pseudo" />
        </label>
        <label>
            Salon
            <input {...register("salon")} type="text" name="salon" id="salon" />
        </label>
        <button type="submit" aria-label="submit button">Rejoindre</button>
      </form>
    </div>
  );
}
export default Form;