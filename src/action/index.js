import cookies from 'universal-cookie'
import axios from 'axios'
import Port from '../port'

const cookie = new cookies()

export const onLoginUser = (email, password) => {
    return (dispatch) => {
    //     axios.post(
    //         Port,
    //         {
    //             email,
    //             password
                
    //         }
    //     ).then( res => {
    //         if(typeof(res.data) == 'string'){
    //             // Print errornya
    //             alert('Error: ' + res.data)
    //         } else {
    //             alert('login berhasil')
            const username = "Gumilang"
            dispatch(
                {
                    type: 'LOGIN_SUCCESS', // untuk menentukan reducer mana yang akan memproses
                    payload: {
                        email,username
                    } // berisi data yang akan di taruh di state
                }
            )
            // Save data kedalam cookie
            cookie.set('userData', {email,username}, {path: '/'})
        //     }
        // })
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