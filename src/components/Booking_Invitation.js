import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Booking_Invitation extends Component {
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
                    time: "08.00 ~ 09.00",
                    attendance: [
                        {
                            nama: "Bambang Sutoyo",
                            email: "bambang.sutoyo@gmail.com",
                            no_hp: "081212349876"
                        },
                        {
                            nama: "Gumilang Febrian",
                            email: "gumilang.febrian@gmail.com",
                            no_hp: "081298761234"
                        },
                        {
                            nama: "Mega Aulia",
                            email: "mega.aulia@gmail.com",
                            no_hp: "081243216789"
                        }
                    ]
                },
                {
                    trans_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    tanggal: "11 Maret 2022",
                    participant: "10 Peserta",
                    addon: "Tv, Speaker, Mic",
                    time: "08.00 ~ 09.00",
                    attendance: [
                        {
                            nama: "Bambang Sutoyo",
                            email: "bambang.sutoyo@gmail.com",
                            no_hp: "081212349876"
                        },
                        {
                            nama: "Gumilang Febrian",
                            email: "gumilang.febrian@gmail.com",
                            no_hp: "081298761234"
                        },
                        {
                            nama: "Mega Aulia",
                            email: "mega.aulia@gmail.com",
                            no_hp: "081243216789"
                        }
                    ]
                },
                {
                    trans_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    tanggal: "11 Maret 2022",
                    participant: "10 Peserta",
                    addon: "Tv, Speaker, Mic",
                    time: "08.00 ~ 09.00",
                    attendance: [
                        {
                            nama: "Bambang Sutoyo",
                            email: "bambang.sutoyo@gmail.com",
                            no_hp: "081212349876"
                        },
                        {
                            nama: "Gumilang Febrian",
                            email: "gumilang.febrian@gmail.com",
                            no_hp: "081298761234"
                        },
                        {
                            nama: "Mega Aulia",
                            email: "mega.aulia@gmail.com",
                            no_hp: "081243216789"
                        }
                    ]
                },
                {
                    trans_id: "REG-11032022-1234",
                    agenda: "Meeting Akhir Tahun",
                    room: "Meeting Room 3",
                    tanggal: "11 Maret 2022",
                    participant: "10 Peserta",
                    addon: "Tv, Speaker, Mic",
                    time: "08.00 ~ 09.00",
                    attendance: [
                        {
                            nama: "Bambang Sutoyo",
                            email: "bambang.sutoyo@gmail.com",
                            no_hp: "081212349876"
                        },
                        {
                            nama: "Gumilang Febrian",
                            email: "gumilang.febrian@gmail.com",
                            no_hp: "081298761234"
                        },
                        {
                            nama: "Mega Aulia",
                            email: "mega.aulia@gmail.com",
                            no_hp: "081243216789"
                        }
                    ]
                }
            ],
            redirect: false,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
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

    renderInvitation = () => {
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
                        <div className='col-4 borders'>
                        </div>
                        <div className='col-3 border-left'>
                            <button className='btn btn-success' onClick={this.toggle}>Blast</button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Email Blast</ModalHeader>
                            <ModalBody>
                                {this.renderAttendance(data.attendance)}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={this.toggle}>Confirm</Button>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            )
        })
    }

    renderAttendance = (attendance) => {
        return attendance.map(attendance =>{
            return (
                <div className='card p-2 mb-2'>
                    <div className='col-6 border-right'>
                        <h3>{attendance.nama} </h3>    
                    </div>
                    <div className='d-block'>
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <b>Email :</b>
                            </div>
                            <div className="col-sm-6">
                                <b>No Hp :</b>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                {attendance.email}
                            </div>
                            <div className="col-sm-6">
                                {attendance.no_hp}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
        
    render () {
        return (
            <div>
                {this.renderInvitation()}
            </div>
        )
    }
}

export default Booking_Invitation