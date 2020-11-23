import React, { useReducer, createContext, useContext} from 'react';

const NotificationStateContext = createContext();
const NotificationDispatchContext = createContext();

function notificationReducer(state, action){
    switch(action.type){
        
        case 'ADD_USERDETAILS':
            return {
                ...state,
                userDetails: action.payload
            }
        case 'CLEAR_DETAILS':{
            console.log("Clear details");
            return {
                ...state,
                userDetails: null
            }
        }

        default:
            return state;
    }
} 

export const NotificationContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(notificationReducer, {userDetails : null})

    return(
        <NotificationDispatchContext.Provider value={dispatch}>
            <NotificationStateContext.Provider value={state}>
                {children}
            </NotificationStateContext.Provider>
        </NotificationDispatchContext.Provider>
    )
}

export const useNotificationState = () => useContext(NotificationStateContext);
export const useNotificationDispatch = () => useContext(NotificationDispatchContext);