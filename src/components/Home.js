import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogoutUser } from '../action'
import './Home.css';

class Home extends Component {
    logoutUser = () => {
        this.props.onLogoutUser()
    }
    
    redirectBooking = () => {
        return <Redirect to='/booking' />
    }
    
    render(){
        return (
            <div> 
                <div className='mt-3 row'> 
                    <div className='col-10 mx-auto'>
                            <Link to={"/booking"}><button type="button" class="tombol btn btn-lg btn-primary my-4">Meeting Room Booking</button></Link>
                            <Link to={"/history"}><button type="button" class="tombol btn btn-lg btn-primary my-4">Meeting Room Status</button></Link>
                            <Link to={"/booking_confirm"}><button type="button" class="tombol btn btn-lg btn-primary my-4">Booking Confirmation</button></Link>
                            <Link to={"/booking_invitation"}><button type="button" class="tombol btn btn-lg btn-primary my-4">Meeting Invitation / Reminder</button></Link>
                            <Link to={"/booking_reschedule"}><button type="button" class="tombol btn btn-lg btn-primary my-4">Reschedule / Cancelation</button></Link>
                    </div>
                </div>
                <div className='row'> 
                    <div className='col-10 mx-auto'>
                        <Link to='/login'>
                            <button type="button" class="btn btn-lg btn-danger my-4" style={{width: "100%"}} onClick={this.logoutUser}>Log Out</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps,{onLogoutUser})(Home)