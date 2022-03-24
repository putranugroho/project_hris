import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import cookies from 'universal-cookie'
import Port from '../port'

const cookie = new cookies()

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    reservation_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    date: "11 Maret 2022",
                    participant: "10 Peserta",
                    time: "08.00 ~ 09.00"
                },  
            ],
            redirect: false
        };
    }

    componentDidMount(){
        this.getHistory()
    }

    getHistory = () => {
        const objCookie = cookie.get("userData")
        axios.get(
            `${Port}/history?user=${objCookie.email}`)
            .then(res => {
              this.setState({data: res.data})
              })
    }

    confirmBooking = () => {
        const detail_booking = this.state.detail_booking
        
    }

    renderHistory = () => {
        return this.state.data.map(data => {
            return (
                <Link to={{
                pathname: `/detailhistory/${data.reservation_id}`,
                state: { detailHistory: data}}}
                style={{textDecoration: "none", color: "black"}}>
                    <div className="card-title mt-2 border p-3">
                        <div className="row mb-2">
                        <div className='col-sm card-title'>
                            <div  style={{fontWeight: "600"}}>{data.reservation_id}</div>
                        </div>
                        <div className='col-sm'>{data.date}</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-6">
                                <div className="row mb-2">
                                    <div className="col-sm-4">
                                        Room
                                    </div>
                                    <div className="col-sm-8">
                                        {data.room}
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-4">
                                        Jam
                                    </div>
                                    <div className="col-sm-8">
                                        {data.time}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="row mb-2">
                                    <div className="col-sm-4">
                                        Participant 
                                    </div>
                                    <div className="col-sm-8">
                                        {data.participant} Peserta
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-4">
                                        Agenda
                                    </div>
                                    <div className="col-sm-8">
                                        {data.agenda}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    redirectBooking = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }
        
    render () {
        return (
            <div> 
                <div className='p-5 row bg-secondary' style={{minHeight: "720px"}}>
                    <div className='col-sm-11 mx-auto border p-4 rounded-3 bg-white'>
                        <h1 className="">My Appointment</h1>
                        <h4 className="mt-3 text-start">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</h4>
                        <div style={{textAlign: "right"}}>
                            <input type="text" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        {this.renderHistory()}
                        {this.redirectBooking()}
                    </div>
                </div>
            </div>
        )
    }
}

export default History