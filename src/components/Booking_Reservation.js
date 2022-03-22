import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import cookies from 'universal-cookie'

import "react-datepicker/dist/react-datepicker.css";

const cookie = new cookies()

class Booking_Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            redirect: false,
            detail_booking: props.location.state.booking,
            isDisplay: null
        };
        console.log(props.location.state.booking);
    }

    componentDidUpdate(){
    }

    confirmBooking = () => {
        const detail_booking = this.state.detail_booking
        const objCookie = cookie.get("userData")
        axios.post(
            'http://localhost:4000/booking',
            {
                detail_booking,
                objCookie
            }
        ).then( res => {
            if(res.data == 'error'){
                alert('Error: ' + res.data)
            } else {
                alert(res.data)
                // this.setRedirect()
            }
        })
    }

    handleClick = (index) => {
        if (index === this.state.isDisplay) {
            this.setState({isDisplay:null})
        } else {
            this.setState({isDisplay:index})
        }
    }

    renderParticipant = () => {
        var participant = this.state.detail_booking.nama
        return participant.map(peserta => {
            return (
                <div>
                    <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ ()=> this.handleClick(participant.indexOf(peserta)) }>{peserta.nama}</button>
                    <div className={this.state.isDisplay === participant.indexOf(peserta) ? 'd-block' : 'd-none'}>
                        <div className="row mb-3">
                            <div className="col-sm-1">
                                <b>Email :</b>
                            </div>
                            <div className="col-sm-3">
                                {peserta.email}
                            </div>
                            <div className="col-sm-1">
                                <b>No Hp :</b>
                            </div>
                            <div className="col-sm-3">
                                {peserta.hp}
                            </div>
                            <div className="col-sm-1" style={{paddingRight:"0px"}}>
                                <b>Reminder :</b>
                            </div>
                            <div className="col-sm-2">
                                {(() => {
                                    if (peserta.blast) {
                                        return (
                                            <div>Yes</div>
                                        )
                                    } else {
                                        return (
                                            <div>No</div>
                                        )
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/history' />
        }
    }
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    render (){
        let {pic,jabatan,nama,agenda,room,date,addon} = this.state.detail_booking
        console.log(pic,jabatan,nama,agenda,room,date,addon);
        room = room[0].value.split(" | Jam ")
        let ruangan = room[0]
        let jam = room[1]
        return (
            <div className='px-5 card'>
                <div className='mt-3 row'> 
                    <div className='col-sm-10 mx-auto'>
                        <div className="position-relative" style={{margin: "2.5rem 5rem"}}>
                            <div className="progress" style={{height: "1px"}}>
                                <div className="progress-bar" role="progressbar" style={{width:"100%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <button type="button" className="position-absolute translate-middle btn btn-sm btn-success rounded-pill p-0" style={{top:"0",left:"10px",width: "2rem", height:"2rem"}}>
                                <img src='checklist.png' style={{width: "21px", height:"18px"}}></img>
                            </button>
                            <div className="position-absolute" style={{top:"20px",left:"-50px"}}>Booking Ruangan</div>
                            <button type="button" className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-primary rounded-pill" style={{width: "2rem", height:"2rem"}}>2</button>
                            <div className="position-absolute" style={{top:"20px",left:"96%"}}>Konfirmasi</div>
                        </div>
                    </div>
                </div>
                <div className='mt-3 row'> 
                    <div className='col-sm-10 mx-auto card'>
                        <div className='card-body'>
                            <div className='border-bottom border-secondary card-title'>
                                <h1>PIC Meeting</h1>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className='card-title'>
                                        <h3  style={{fontWeight: "600"}}>Nama PIC</h3>
                                    </div>
                                    <h5>{pic}</h5>
                                </div>
                                <div className="col-sm-6 border-2 border-start">
                                    <div className='card-title'>
                                        <h3  style={{fontWeight: "600"}}>Jabatan</h3>
                                    </div>
                                    <h5>{jabatan}</h5>
                                </div>
                            </div>
                            <div className='border-bottom border-secondary card-title'>
                                <h1>Detail Meeting</h1>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <h3>Meeting Room</h3>
                                    <h5>{ruangan}</h5>
                                </div>
                                <div className="col-sm-3 border-2 border-start">
                                    <h3>Tanggal</h3>
                                    <h5>{date}</h5>
                                </div>
                                <div className="col-sm-3 border-2 border-start">
                                    <h3>Jam</h3>
                                    <h5>{jam}</h5>
                                </div>
                                <div className="col-sm-3 border-2 border-start">
                                    <h3>Addon</h3>
                                    <h5>{addon.join(",")}</h5>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm">
                                    <div className='card-title'>
                                        <h3  style={{fontWeight: "600"}}>Agenda</h3>
                                    </div>
                                    <h5>{agenda}</h5>
                                </div>
                            </div>
                            <div className="card-title d-flex mb-3 border-bottom border-secondary">
                                <h1 style={{marginRight:"20px"}}>Participant</h1>
                                <h1>({nama.length} Participant)</h1>
                            </div>
                            {this.renderParticipant()}
                        </div>
                    </div>
                </div>
                <div className='mt-3 row'>
                    <div className='col-sm-10 mx-auto card'>
                        <button className='btn btn-primary my-3' onClick={()=>this.confirmBooking()}>
                            Kirim
                        </button>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        )
    }
}

export default Booking_Reservation