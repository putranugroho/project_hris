import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Detail_History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history : {
                        pemesan: {
                            pic: "Bambang Sutoyo",
                            jabatan: "Manager",
                            trans_id: "REG-11032022-1234",
                            agenda: "Meeting Akhir Tahun",
                            room: "Meeting Room 3",
                            tanggal: "11 Maret 2022",
                            participant: "10 Peserta",
                            addon: "Tv, Speaker, Mic",
                            time: "08.00 ~ 09.00",
                            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel turpis nunc eget lorem dolor. Orci sagittis eu volutpat odio facilisis mauris sit amet. Nunc lobortis mattis aliquam faucibus purus in massa. Elementum tempus egestas sed sed risus pretium quam. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Maecenas accumsan lacus vel facilisis volutpat est velit. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Integer enim neque volutpat ac. Turpis egestas maecenas pharetra convallis posuere morbi. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Cursus vitae congue mauris rhoncus."
                        },
                        participant: [
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
                isDisplay: 0,
                total_amount: 0
            }
    }

    handleClick = (index) => {
        if (index === this.state.isDisplay) {
            this.setState({isDisplay:null})
        } else {
            this.setState({isDisplay:index})
        }
    }

    renderPemesan = () => {
        var {pic,jabatan,agenda, room, participant, tanggal, addon, time, note, trans_id} = this.state.history.pemesan
        return (
            <div className='mx-auto card mb-3'>
                <div className='card-body'>
                    <div className="card-title d-flex">
                        <h1 style={{marginRight:"20px"}}>Register</h1>
                        <h1>({trans_id})</h1>
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
                            {tanggal}
                        </div>
                        <div className="col-sm-3">
                            {time}
                        </div>
                        <div className="col-sm-3">
                            {participant}
                        </div>
                        <div className="col-sm-4">
                            {addon}
                        </div>
                    </div>
                    <div className="">
                        Note
                    </div>
                    <div className="">
                          {note}
                    </div>
                </div>
            </div>
        )
    }

    renderParticipant = () => {
        var participant = this.state.history.participant
        return participant.map(data => {
            return (
                <div>
                    <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ ()=> this.handleClick(participant.indexOf(data)) }>{data.nama}</button>
                    <div className={this.state.isDisplay == participant.indexOf(data) ? 'd-block' : 'd-none'}>
                        <div className="row mb-3    ">
                            <div className="col-sm-2">
                                <b>Email :</b>
                            </div>
                            <div className="col-sm-3">
                                {data.email}
                            </div>
                            <div className="col-sm-4">
                                <b>No Hp :</b>
                            </div>
                            <div className="col-sm-3">
                                {data.no_hp}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    
    render() {
        var participant = this.state.history.participant
            return (
                <div className='card-body'>     
                    {this.renderPemesan()}
                    <div className='mx-auto card mb-3'>
                        <div className='card-body'> 
                            <div className="card-title d-flex">
                                <h1 style={{marginRight:"20px"}}>Participant</h1>
                                <h1>({participant.length} Participant)</h1>
                            </div>
                        {this.renderParticipant()}
                        </div>
                    </div>
                </div>
            )
    }
}

export default Detail_History