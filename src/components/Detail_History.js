import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Port from '../port'

class Detail_History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history : {
                pemesan:  props.location.state.detailHistory
            },
            participant: [],
            isDisplay: 0,
            total_amount: 0
        }
        console.log(props.location.state);
    }

    componentDidMount(){
        this.getParticipant()
    }

    getParticipant = () => {
        axios.get(
            `${Port}/participant?id=${this.state.history.pemesan.reservation_id}`)
            .then(res => {
              this.setState({participant: res.data})
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
        var participant = this.state.participant
        return participant.map(data => {
            return (
                <div>
                    <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ ()=> this.handleClick(participant.indexOf(data)) }>{data.nama}</button>
                    <div className={this.state.isDisplay === participant.indexOf(data) ? 'd-block' : 'd-none'}>
                        <div className="row mb-3    ">
                            <div className="col-sm-1">
                                <b>Email :</b>
                            </div>
                            <div className="col-sm-3">
                                {data.email}
                            </div>
                            <div className="col-sm-1">
                                <b>No Hp :</b>
                            </div>
                            <div className="col-sm-3">
                                {data.hp}
                            </div>
                            <div className="col-sm-1" style={{paddingRight:"0px"}}>
                                <b>Reminder :</b>
                            </div>
                            <div className="col-sm-2">
                                {(() => {
                                    if (data.blast) {
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
    
    render() {
        var {pic,jabatan,agenda, room, participant, date, addon, time,reservation_id} = this.state.history.pemesan
            return (
                <div className='card-body'>     
                    <div className='mx-auto card mb-3'>
                        <div className='card-body'>
                            <div className="card-title d-flex">
                                <h1 style={{marginRight:"20px"}}>Detail History</h1>
                                <h1>({reservation_id})</h1>
                                <Link to={"/history"} style={{marginLeft: "auto"}}><div>X</div></Link>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <b>PIC</b>
                                </div>
                                <div className="col-sm-3">
                                    <b>Jabatan</b>
                                </div>
                                <div className="col-sm-3">
                                    <b>Meeting Room</b>
                                </div>
                                <div className="col-sm-4">
                                    <b>Agenda</b>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-sm-2">
                                    {pic}
                                </div>
                                <div className="col-sm-3">
                                    {jabatan}
                                </div>
                                <div className="col-sm-3">
                                    {room}
                                </div>
                                <div className="col-sm-4">
                                    {agenda}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <b>Tanggal</b>
                                </div>
                                <div className="col-sm-3">
                                    <b>Jam</b>
                                </div>
                                <div className="col-sm-3">
                                    <b>Jumlah Peserta</b>
                                </div>
                                <div className="col-sm-4">
                                    <b>Add On</b>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-sm-2">
                                    {date}
                                </div>
                                <div className="col-sm-3">
                                    {time}
                                </div>
                                <div className="col-sm-3">
                                    {participant} Peserta
                                </div>
                                <div className="col-sm-4">
                                    {addon}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-auto card mb-3'>
                        <div className='card-body'> 
                            <div className="card-title d-flex">
                                <h1 style={{marginRight:"20px"}}>Participant</h1>
                                <h1>({this.state.participant.length} Participant)</h1>
                            </div>
                        {this.renderParticipant()}
                        </div>
                    </div>
                </div>
            )
    }
}

export default Detail_History