function StateReducer(state, action) {

  switch (action.type) {
    case 'pseudo':
      localStorage.removeItem('pseudo');
      localStorage.setItem('pseudo', action.payload);
      return state;
    case 'salon':    
      localStorage.removeItem('salon');  
      localStorage.setItem('salon', action.payload);
      return state;
    case 'userId':
      localStorage.removeItem('userId');
      localStorage.setItem('userId', action.payload);
      return state;
    default:
      throw new Error();
  }
}
export default StateReducer;