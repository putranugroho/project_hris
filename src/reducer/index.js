import { combineReducers } from 'redux'


const init = {
    username: '', 
    email: ''
}

const AuthReducer = (data = init, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...data,
                username: action.payload.username,
                email: action.payload.email, 
            }

        case "LOGOUT_SUCCESS":
            return {
                ...data,
                username: "", 
                email: ''
            }

        case "CONTINUE_BOOKING":
            return {
                dataBooking: action.payload.dataBooking
            }
    
        default:
            return data
    }
}

// combineReducers akan return sesuatu, yang akan di export
export default combineReducers(
    { 
        auth : AuthReducer
    }
)