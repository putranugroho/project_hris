import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Booking_Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    pic: "Bambang Sutoyo",
                    jabatan: "Manager",
                    trans_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    tanggal: "11 Maret 2022",
                    participant: "10 Peserta",
                    addon: "Tv, Speaker, Mic",
                    time: "08.00 ~ 09.00"
                },
                {
                    pic: "Bambang Sutoyo",
                    jabatan: "Manager",
                    trans_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    tanggal: "11 Maret 2022",
                    participant: "10 Peserta",
                    addon: "Tv, Speaker, Mic",
                    time: "08.00 ~ 09.00"
                },
                {
                    pic: "Bambang Sutoyo",
                    jabatan: "Manager",
                    trans_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    tanggal: "11 Maret 2022",
                    participant: "10 Peserta",
                    addon: "Tv, Speaker, Mic",
                    time: "08.00 ~ 09.00"
                },
                {
                    pic: "Bambang Sutoyo",
                    jabatan: "Manager",
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
                            <div className='row mt-2'>
                                <div className='col-3'><b>PIC</b></div>
                                <div className='col-9'>: {data.pic}</div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-3'><b>Jabatan</b></div>
                                <div className='col-9'>: {data.jabatan}</div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row mt-2'>
                        <div className='col-3 border-left'>
                            <div>Room : {data.room} </div>
                        </div>
                        <div className='col-3 border-left'>
                            <div>Participant : {data.participant} </div>
                        </div>
                        <div className='col-3 borders'>
                            <div>Tanggal : {data.tanggal}</div>
                        </div>
                        <div className='col-3 borders'>
                            <div>Jam : {data.time}</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row mb-3'>
                        <div className='col-5 border-right'>
                            <h3>Agenda</h3>
                            <hr></hr>
                            {data.agenda}
                        </div>
                        <div className='col-5 borders'>
                            <h3>Add On</h3>
                            <hr></hr>
                            {data.addon}
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