import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";

class Booking_Reschedule extends Component {
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
            jam: ["08.00","09.00","12.00","13.00","14.00","15.00","19.00","20.00","21.00"],
            startDate: new Date(),
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

    renderCalender = () => {
        const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
          <button className="btn btn-outline-secondary" style={{width: "100%"}} type="button" onClick={onClick} ref={ref}>
            {value}
          </button>
        ));
        return (
          <DatePicker
          selected={this.state.startDate}
          onChange={(date) => this.setState({ startDate: date })}
            customInput={<ExampleCustomInput />}
          />
        );
    };

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

    renderJam = () => {
        return this.state.jam.map(jam =>{
            return (
                <option value={jam}>{jam}</option>
            )
        })
    }

    renderReschedule = () => {
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
                        <div className='col-3    border-left'>
                            <button className='btn btn-success m-2' onClick={this.toggle}>Reschedule</button>
                            <button className='btn btn-danger m-2' style={{width:"90px"}}>Cancel</button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Reschedule</ModalHeader>
                            <ModalBody>
                            <div className='d-block'>
                                {this.renderCalender()}
                                <div class="input-group mt-3 mb-3">
                                    <div class="input-group-prepend" style={{width: "20%"}}>
                                        <label class="input-group-text" for="inputGroupSelect01">Jam</label>
                                    </div>
                                    <select class="custom-select" id="inputGroupSelect01" style={{width: "40%"}}>
                                        {this.renderJam()}
                                    </select>
                                    <select class="custom-select" id="inputGroupSelect01" style={{width: "40%"}}>
                                        {this.renderJam()}
                                    </select>
                                </div>
                            </div>
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
        
    render () {
        return (
            <div>
                {this.renderReschedule()}
            </div>
        )
        
    }
}

export default Booking_Reschedule