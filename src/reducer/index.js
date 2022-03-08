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