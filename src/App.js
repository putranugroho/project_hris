import React from 'react'
import { BrowserRouter, Route, Redirect} from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'
import './App.css';

import Login from './components/Login'
import Booking_Room from './components/Booking_Room'  
import Booking_Confirm from './components/Booking_Confirm'
import Booking_Reschedule from './components/Booking_Reschedule'
import Booking_Invitation from './components/Booking_Invitation'
import Meeting_Room_Setup from './components/Meeting_Room_Setup'
import Facilities_Setup from './components/Facilities_Setup'
import Account_Setup from './components/Account_Setup'
import Home from './components/Home'
import Setup from './components/Setup'
import History from './components/History'
import Detail_History from './components/Detail_History'
import {keepLogin} from './action'

const cookie = new cookies()

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          redirect: false
      };
  }

  componentDidMount(){
    // Check cookie
    const objCookie = cookie.get("userData")

    if (objCookie !== undefined) {
        this.props.keepLogin(objCookie)
    } else {
      this.setState({redirect: true})
    }
  }

  renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/login' />
      }
  }

  render(){
    return (
      <BrowserRouter>
          <Route path="/login" exact component={Login}/>
          <Route path="/" exact component={Home}/>
          <Route path="/setup" exact component={Setup}/>
          <Route path="/booking" exact component={Booking_Room}/>
          <Route path="/booking_confirm" exact component={Booking_Confirm}/>
          <Route path="/booking_reschedule" exact component={Booking_Reschedule}/>
          <Route path="/booking_invitation" exact component={Booking_Invitation}/>
          <Route path="/history" exact component={History}/>
          <Route path="/meeting_setup" exact component={Meeting_Room_Setup}/>
          <Route path="/facilities_setup" exact component={Facilities_Setup}/>
          <Route path="/account_setup" exact component={Account_Setup}/>
          <Route path="/detailhistory/:trans_id" exact component={Detail_History}/>
          {this.renderRedirect()}
      </BrowserRouter>
    );
  }

}

export default connect(null, {keepLogin})(App)
