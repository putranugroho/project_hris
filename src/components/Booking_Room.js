import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import DatePicker from "react-datepicker";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import './Booking_Room.css';

import RoomItem from './RoomItem'
import ParticipantItem from './ParticipantItem'

class Booking_Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            redirect: false,
            peserta: [],
            activePeserta: null,
            AddOn: ["TV","Speaker","Infocus","Mic","Mixer"],
            ruangan: [],
            activeRuangan: null,
            services: [],
            detail_service: [],
            detail_room: [],
            selectOption : 0,
            jumlahPeserta: []
        };

        this.handleChange = this.handleChange.bind(this);
    }
    
    addService = () => this.setState({redirect: true})

    addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    addPeserta = () => {
        let newPeserta = []
        let addPeserta = this.state.peserta.length+1
        for (let i = 1; i <= addPeserta; i++) {
            newPeserta.push(i)
        }
        this.setState({ peserta: newPeserta})
    }

    componentDidMount(){
        this.getRoom()
    }

    componentDidUpdate(){
        this.renderRuangan()
    }

    getRoom = () => {
        axios.get('http://localhost:4000/rooms')
          .then(res => {
            this.setState({ruangan: res.data})
            })
    }

    handleChange(e) {
        let selectOption = parseInt(e.target.value)
        let jumlahPeserta = []
        for (let i = 0; i <= selectOption; i++) {
            if (i !== 0) {
                jumlahPeserta.push(i)
            }
        }
        this.setState({selectOption})
        this.setState({jumlahPeserta})
    }

    handleClickPeserta = (index) => {
        if (index === this.state.activePeserta) {
            this.setState({ activePeserta: null })
        } else {
            this.setState({ activePeserta: index })
        }
    }

    handleClickRuangan = (index) => {
        if (index === this.state.activeRuangan) {
            this.setState({ activeRuangan: null })
        } else {
            this.setState({ activeRuangan: index })
        }
    }

    handleOnChange = value => {
        let detail_service = this.state.detail_service
        if (value.length) {
            for (let i = 0; i < detail_service.length; i++) {
                if (detail_service[i].id === value[0].id) {
                    if (detail_service[i].count === 1) {
                        this.state.detail_service.splice(i, 1);
                    } else {
                        detail_service[i].count = detail_service[i].count-1
                        detail_service[i].value = parseInt(detail_service[i].value)-parseInt(value[0].value)
                    }
                    break
                }
            }
        } else if (!value.length) {
            if (detail_service.length === 0) {
                value.count = 1
                detail_service.push(value)
            }
            else {
                let noValue = false
                for (let i = 0; i < detail_service.length; i++) {
                    if (detail_service[i].id === value.id) {
                        noValue = false
                        detail_service[i].count = detail_service[i].count+1
                        detail_service[i].value = parseInt(detail_service[i].value)+parseInt(value.value)
                        break
                    } else {
                        noValue = true
                    }
                }
                if (noValue) {
                    value.count = 1
                    detail_service.push(value)
                }
            }
        }
        let detail_room = []
        let ruangan = this.state.ruangan
        if (detail_service.length) {
            for (let i = 0; i < ruangan.length; i++) {
                if (detail_service[0].ruangan_id === ruangan[i].id) {
                    detail_room.push(ruangan[i])
                }
            }
        }
        this.setState({detail_service})
    }

    renderBooking = () => {
        if (this.state.detail_service.length) {
            if (this.state.selectOption !== 0) {
                return (
                    <div>
                        <div className='border-bottom border-secondary card-title d-flex'>
                            <h2>Meeting Participants</h2>
                            <span className='align-self-center mx-3'>Jumlah dan data peserta</span>
                        </div>
                        <div className='card-title'>
                            <div  style={{fontWeight: "600"}}>Jumlah Peserta</div>
                        </div>
                        <select id="selectJumlah" className="form-select mb-3" aria-label="Default select example" value={this.state.selectOption} onChange={this.handleChange} >
                            <option value="default">0</option>
                            {this.renderOption()}
                        </select>
                        {this.renderPeserta()}
                        <div className='border-bottom border-secondary card-title d-flex mt-3'>
                            <h2>Additional Request</h2>
                            <span className='align-self-center mx-3'>Kebutuhan tambahan</span>
                        </div>
                        <div className="p-3">
                            {this.renderFasilitas()}
                            <div className='card-title'>
                                <div  style={{fontWeight: "600"}}>Lain-lain : </div>
                            </div>
                            <form className='input-group mb-3'>
                                <input className='form-control' type="text" ref={(input)=>{this.nama = input}}/>
                            </form>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div className='border-bottom border-secondary card-title d-flex'>
                            <h2>Meeting Participants</h2>
                            <span className='align-self-center mx-3'>Jumlah dan data peserta</span>
                        </div>
                        <div className='card-title'>
                            <div  style={{fontWeight: "600"}}>Jumlah Peserta</div>
                        </div>
                        <select id="selectJumlah" className="form-select" aria-label="Default select example" value={this.state.selectOption} onChange={this.handleChange}>
                            <option value="default">0</option>
                            {this.renderOption()}
                        </select>
                    </div>
                )
            }
        } else {
            return (
                <div></div>
            )
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
            selected={this.addDays(new Date(), 1)}
            onChange={(date) => this.setState({ startDate: date })}
            minDate={this.addDays(new Date(), 1)}
            customInput={<ExampleCustomInput />}
          />
        );
    };

    renderDetailService = () => {
        if (this.state.detail_service) {
            return this.state.detail_service.map(selected => {
                return (
                    <div className="d-flex navbar py-2">
                        <div>
                            {this.state.startDate.toString().substring(0,15)}
                        </div>
                        <div>
                            {selected.value}
                        </div>
                    </div>
                )
            })
        }
    }

    renderFasilitas = () => {
        let ruangan_id = this.state.detail_service[0].ruangan_id
        // let addon = this.state.AddOn
        // let active = []
        // for (let a = 0; a < addon.length; a++) {
        //     let i = ""
        //     for (let b = 0; b < fasilitas.length; b++) {
        //         if (fasilitas[b] !== addon[a]) {
        //             i = addon[a]
        //         } else if (fasilitas[b] === addon[a]) {
        //             i = ""
        //             break
        //         }
        //     }
        //     if (i !== "") {
        //         active.push(i)
        //     }
        // }
        return this.state.ruangan.map(ruangan => {
            if (ruangan.room_id === ruangan_id) {
                return ruangan.facility.map(facility => {
                    if (facility.status === 0) {
                        return (
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id={facility.facility_name} value={facility.facility_name}/>
                                <label className="form-check-label" >{facility.facility_name}</label>
                            </div>
                        )           
                    }
                })
            }
        })
    }

    renderOption = () => {
        let capacity = ""
        let jumlahPeserta = []
        if (this.state.detail_service.length !== 0) {
            let id = this.state.detail_service[0].ruangan_id
            let ruangan = this.state.ruangan
            for (let i = 0; i < ruangan.length; i++) {
                if (ruangan[i].room_id === id) {
                    capacity = parseInt(ruangan[i].capacity)
                    for (let i = 0; i <= capacity; i++) {
                        if (i !== 0) {
                            jumlahPeserta.push(i)
                        }
                    }
                }
            }
            return jumlahPeserta.map(jumlah => {
                return (
                    <option value={jumlah}>{jumlah}</option>
                )
            })
        } else {
            capacity = ""
            jumlahPeserta = []
            this.setState({ jumlahPeserta });
        }
    }

    renderRuangan = () => {
        return this.state.ruangan.map(ruangan => {
            return (
                <RoomItem value={this.state.services} time_slot={ruangan.time_slot}name={ruangan.roomname} index={ruangan.room_id} kapasitas={ruangan.capacity} fasilitas={ruangan.facility} isDisplay={ this.state.activeRuangan===ruangan.room_id } onClick={ this.handleClickRuangan } onChange={ this.handleOnChange }/>
            )
        })
    }
    
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    renderService = () => {
        if (this.state.detail_service.length !== 0) {
            return (
                <div>
                    {this.renderDetailService()}
                    {/* <div className="d-flex navbar border-bottom border-secondary py-2">
                        <div>
                            Add On : 
                        </div>
                        <div>
                            {this.state.peserta.length}
                        </div>
                    </div> */}
                    <div className="d-flex navbar border-bottom border-secondary py-2">
                        <div>
                            Total Peserta : 
                        </div>
                        <div>
                            {this.state.peserta.length}
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderPeserta = () => {
        return this.state.jumlahPeserta.map(peserta => {
            if (peserta !== 0) {
                return (
                    <ParticipantItem value={this.state.services} index={peserta} isDisplay={ this.state.activePeserta===peserta } onClick={ this.handleClickPeserta }/>
                )
            }
        })
    }
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    // Addon = () => {
    //     if (this.state.detail_service.length != 0) {
    //         return (
    //             <div> 
    //                 <div className='border-bottom border-secondary card-title d-flex'>
    //                     <h1>Additional Request</h1>
    //                     <span className='align-self-center mx-3'>Kebutuhan tambahan</span>
    //                 </div>
    //                 <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
    //                     {this.renderAddon()}    
    //                 </div>
    //             </div>
    //         )
    //     }
    // }

    // renderAddon = () => {
        // let addon = this.state.AddOn
        // return this.state.ruangan.map(ruangan => {  
        //     if (this.state.detail_service[0].id === ruangan.id) {
        //         for (let a = 0; a < addon.length; a++) {
        //             for (let b = 0; b < ruangan.fasilitas.length; b++) {
        //                 if (addon[a].fasilitas === ruangan.fasilitas[b]) {
        //                     return(
        //                         <div>
        //                             <input type="checkbox" className="btn-check" id={addon.id} autocomplete="off"/>
        //                             <label className="btn btn-outline-primary mx-2" for={addon.id}>{addon.fasilitas}</label>
        //                         </div>
        //                     )
        //                 } else {
        //                     return(
        //                         <div>
        //                             <input type="checkbox" className="btn-check" id={addon.id} autocomplete="off"/>
        //                             <label className="btn btn-outline-info mx-2" disabled for={addon.id}>{addon.fasilitas}</label>
        //                         </div>
        //                     )
        //                 }
        //             }
        //         }
        //     }
        // })
        // let newaddon = []
        // for (let a = 0; a < this.state.ruangan.length; a++) {
        //     if (this.state.detail_service[0].id == this.state.ruangan[a].id) {
        //         for (let b = 0; b < this.state.ruangan[a].fasilitas.length; b++) {
        //             for (let i = 0; i < this.state.AddOn.length; i++) {
        //                 if (this.state.AddOn[i] == this.state.ruangan[a].fasilitas[b]) {
        //                     break
        //                 } else if (i == this.state.AddOn.length)
        //                     newaddon.push(this.state.ruangan[a].fasilitas[b]
        //                 )
        //             }   
        //         }
        //     }
        // }

        // console.log(newaddon);
        
        // return this.state.AddOn.map(AddOn => {
        //     return(
        //         <div>
        //             <input type="checkbox" className="btn-check" id={AddOn} autocomplete="off"/>
        //             <label className="btn btn-outline-primary mx-2" for={AddOn}>{AddOn}</label>
        //         </div>
        //     )
        // })
    // }

    render (){
        return (
            <div className='mt-3 row'> 
                <div className='col-sm-10 mx-auto card'>
                    <div className='card-body'>
                        <div className='border-bottom border-secondary card-title d-flex' >
                            <h2>Registration</h2>
                            <span className='align-self-center mx-3'>Pilih Tanggal Pengunaan Ruangan</span>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-12">
                                {this.renderCalender()}
                            </div>
                        </div><div className='border-bottom border-secondary card-title d-flex'>
                            <h2>PIC Meeting</h2>
                            <span className='align-self-center mx-3'>Masukan Nama dan Jabatan PIC Meeting</span>
                        </div>
                        <div className='d-block'>
                            <div className='card-title'>
                                <div  style={{fontWeight: "600"}}>Nama Lengkap PIC</div>
                            </div>
                            <form className='input-group mb-3'>
                                <input className='form-control' type="text" ref={(input)=>{this.nama = input}}/>
                            </form>
                            <div className='card-title'>
                                <div  style={{fontWeight: "600"}}>Jabatan</div>
                            <form className='input-group mb-3'>
                                <input className='form-control' type="text" ref={(input)=>{this.jabatan = input}}/>
                            </form>
                            </div>
                        </div>
                        <div className='border-bottom border-secondary card-title d-flex'>
                            <h2>Agenda Meeting</h2>
                            <span className='align-self-center mx-3'>Jelaskan agenda/ topik meeting</span>
                        </div>
                        <form className='input-group mb-3'>
                            <input className='form-control' type="text" ref={(input)=>{this.nama = input}}/>
                        </form>
                        <div className='border-bottom border-secondary card-title d-flex'>
                            <h2>Meeting Room</h2>
                            <span className='align-self-center mx-3'>Pilih Ruang dan Waktu</span>
                        </div>
                        {this.renderRuangan()}
                        {this.renderBooking()}
                        <Link to={"/"}>
                            <button className='btn btn-danger mx-3'>Cancel</button>
                        </Link>
                        <button className='btn btn-primary my-3' onClick={this.setRedirect}>
                            Kirim
                        </button>
                        {this.renderRedirect()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Booking_Room