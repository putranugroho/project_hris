import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { onLoginUser } from '../action/index'



class Login extends Component {

    state = {
        text: "Show Password",
        text2: "Hide Password"
      }

    onButtonClick = () => {
        const username = this.username.value
        const password = this.password.value

        this.props.onLoginUser(username,password)
    }

    showPassword = (text) => {
        let txt = text
        if (text === "Hide Password") {
            this.password.type = "text"
            this.setState({text2:this.state.text})
            this.setState({text:txt})
        } else if (text === "Show Password") {
            this.password.type = "password"
            this.setState({text2:this.state.text})
            this.setState({text:txt})
        }
    }
        
    render () {
        const { text, text2 } = this.state
        if (this.props.user.username === '') {
            return (
                <div> 
                    <div className='mt-5 row'>
                        <div className='col-sm-6 bg-info text-center'>
                            <h1 className="mt-5">Tirta Medical Centre</h1>
                            <h4 className="mt-3 mx-4 text-start">TMC is one of the pioneers in Medical Check Up, Laboratory, and COVID-19 Test in Indonesia with high capacity and professional staff, with services available at clinics, onsite, and Home Care.</h4>
                        </div>
                        <div className='col-sm-5 mx-auto card bg-secondary'>
                            <div className='card-body bg-light'>
                                <div className='border-bottom border-secondary card-title'>
                                    <h1>Login</h1>
                                </div>
                                <form className='input-group mt-3'>
                                    <input className='form-control' type='text' placeholder="Email" ref={(input)=>{this.username = input}}/>
                                </form>
                                <form className='input-group mt-3'>
                                    <input type="password" className="form-control" placeholder="Password" ref={(input)=>{this.password = input}}/>
                                    <button className="btn btn-outline-secondary" type="button" id="buttonAddon2" onClick={ () => { this.showPassword(text2)}  }>{text}</button>
                                </form> 
                                <button className='btn btn-primary mt-2' onClick={this.onButtonClick}>
                                    LOGIN
                                </button>
                                <p>Tidak memiliki akun ? <Link to='/Booking_Room'>Click Disini!</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } return <Redirect to='/'/>
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps, {onLoginUser})(Login)