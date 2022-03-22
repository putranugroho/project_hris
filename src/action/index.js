import cookies from 'universal-cookie'
import axios from 'axios'
// import Port from '../port'

const cookie = new cookies()

export const onLoginUser = (email) => {
    return (dispatch) => {
        axios.post(
            'http://localhost:4000/users/login',
            {
                email
                // password
                
            }
        ).then( res => {
            if(res.data === 'Email admin@email.com'){
                alert('Error: ' + res.data)
            } else {
                alert('login berhasil')
                const username = "Admin"
                dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            email,username
                        }
                    }
                )
                cookie.set('userData', {email,username}, {path: '/'})
            }
        })
    }
}

export const keepLogin = (objUser) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            username: objUser.username,
            email: objUser.email
        }
    }
}

export const onLogoutUser = () => {
    cookie.remove('userData')
    return {
        type: "LOGOUT_SUCCESS"
    }
}

export const bookingConfirmation = (dataBooking) => {
    return {
        type: "CONTINUE_BOOKING",
        payload: {
            dataBooking
        }
    }
}