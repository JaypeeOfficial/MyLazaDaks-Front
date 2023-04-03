const token = sessionStorage.getItem('userToken') 


export const authReducer = (state = token, action) => {

switch(action.type)
 {
    case 'SET_AUTH':
        return action.payload;
        
        default:
            return state;
 }
};
