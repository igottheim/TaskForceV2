
export function addUser(room) {
    return {
      type: "user/add",
      payload: room,
    };
  }
  
   
    // Reducer
    const initialState = [];
    
    function chatReducer(state = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        // sync actions
        case "user/add":
          return [...state, payload];
  
        default:
          return state;
      }
    }
    
    export default chatReducer;