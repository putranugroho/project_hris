import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class Booking_Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    trans_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    tanggal: "11 Maret 2022",
                    participant: "10 Peserta",
                    addon: "Tv, Speaker, Mic",
                    time: "08.00 ~ 09.00"
                },
                {
                    trans_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    tanggal: "11 Maret 2022",
                    participant: "10 Peserta",
                    addon: "Tv, Speaker, Mic",
                    time: "08.00 ~ 09.00"
                },
                {
                    trans_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    tanggal: "11 Maret 2022",
                    participant: "10 Peserta",
                    addon: "Tv, Speaker, Mic",
                    time: "08.00 ~ 09.00"
                },
                {
                    trans_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    tanggal: "11 Maret 2022",
                    participant: "10 Peserta",
                    addon: "Tv, Speaker, Mic",
                    time: "08.00 ~ 09.00"
                },  
            ],
            redirect: false
        };
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

    renderConfirm = () => {
        return this.state.data.map(data =>{
            return (
                <div className='container mt-4' style={{borderStyle:"solid", borderColor:'AntiqueWhite'}}>
                    <div className='row mt-2'>
                        <div className='col-6 border-right'>
                            <h3>Trans ID : {data.trans_id} </h3>    
                        </div>
                        <div className='col-6'>
                            <div>Tanggal : {data.tanggal}</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row mt-2'>
                        <div className='col-3 border-left'>
                            <div>Room : {data.room} </div>
                        </div>
                        <div className='col-3 borders'>
                            <div>Jam : {data.time}</div>
                        </div>
                        <div className='col-3 borders'>
                            <div>Agenda : {data.agenda}</div>
                        </div>
                        <div className='col-3 border-left'>
                            <div>Participant : {data.participant} </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row mb-3'>
                        <div className='col-5 border-right'>
                            <h3>Add On</h3>
                            <hr></hr>
                            {data.addon}
                        </div>
                        <div className='col-5 borders'>
                        </div>
                        <div className='col-2 border-left'>
                        <button className='btn btn-success m-2' style={{width:"90px"}}>Approve</button>
                        <button className='btn btn-danger m-2' style={{width:"90px"}}>Reject</button>
                        </div>
                    </div>
                </div>
            )
        })
    }
        
    render () {
        return (
            <div>
                {this.renderConfirm()}
            </div>
        )
    }
}

export default Booking_Confirm