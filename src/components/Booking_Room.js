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
            startDate: this.addDays(new Date(), 1),
            redirect: false,
            peserta: [],
            activePeserta: null,
            AddOn: [],
            ruangan: [],
            activeRuangan: null,
            services: [],
            detail_service: [],
            detail_room: [],
            selectOption : 0,
            jumlahPeserta: [],
            data_booking: {},
            reservation: false
        };

        this.handleChange = this.handleChange.bind(this);
    }
    
    addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    
    addService = () => this.setState({redirect: true})

    addPeserta = () => {
        let newPeserta = []
        let addPeserta = this.state.peserta.length+1
        for (let i = 1; i <= addPeserta; i++) {
            newPeserta.push(i)
        }
        this.setState({ peserta: newPeserta})
    }

    bookingConfirmation = () => {
        let nama = []
        for (let x = 0; x < this.state.selectOption; x++) {
            let peserta = {}
            peserta.nama = document.getElementById(`nama-peserta${x+1}`).value
            peserta.hp = document.getElementById(`hp-peserta${x+1}`).value
            peserta.email = document.getElementById(`email-peserta${x+1}`).value
            peserta.blast = document.getElementById(`checkbox${x+1}`).checked
            nama.push(peserta)
        }
        let fasilitas = []
        for (let a = 0; a < this.state.ruangan.length; a++) {
            if (this.state.ruangan[a].room_id === this.state.detail_service[0].ruangan_id) {
                for (let b = 0; b < this.state.ruangan[a].facility.length; b++) {
                    if (this.state.ruangan[a].facility[b].status === 0) {
                        fasilitas.push(this.state.ruangan[a].facility[b].facility_name)
                    }
                }
            }
        }
        let addon = []
        for (let y = 0; y < fasilitas.length; y++) {
            if (document.getElementById(`${fasilitas[y]}`).checked)
            addon.push(fasilitas[y])
        }
        if (this.etc.value) {
            addon.push(this.etc.value)
        }
        let date = new Date(this.state.startDate)
        let month = date.getMonth()+1
        date = `${month}-${date.getDate()}-${date.getFullYear()}`
        let pic = this.pic.value
        let jabatan = this.jabatan.value
        let agenda = this.agenda.value
        let payload = {
            pic,jabatan,nama,agenda,date,addon
        }
        this.setState({data_booking:payload,reservation:true})
    }

    componentDidMount(){
        this.getRoom()
    }

    componentWillMount(){
        this.getRoom()
    }

    componentDidUpdate(){
        this.renderRuangan()
        this.renderBooking()
    }

    getRoom = (tanggal) => {
        let date = new Date(this.state.startDate)
        if (tanggal) {
            date = tanggal
        }
        let month = date.getMonth()+1
        if (month < 10) {
            month = `0${month}`
        }
        let day = date.getDate()
        if (day < 10) {
            day = `0${day}`
        }
        date = `${month}-${day}-${date.getFullYear()}`
        axios.get('http://localhost:4000/rooms?date='+date)
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
        value.date = document.getElementById("tanggal").innerHTML
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
                                <input className='form-control' type="text" ref={(input)=>{this.etc = input}}/>
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
          <button id="tanggal" className="btn btn-outline-secondary" style={{width: "100%"}} type="button" onClick={onClick} ref={ref}>
            {value}
          </button>
        ));
        return (
          <DatePicker
            selected={this.state.startDate}
            onChange={(date) => {
                this.setState({startDate: date})
                this.getRoom(date)
            }}
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

    renderReservation = () => {
        let data = this.state.data_booking
        if (this.state.reservation) {
            return <Redirect
                to={{
                pathname: "/booking_reservation",
                state: { booking : {
                    pic:data.pic,
                    jabatan:data.jabatan,
                    nama:data.nama,
                    agenda:data.agenda,
                    room:this.state.detail_service,
                    date:data.date,
                    addon:data.addon
                    }}
                }}
            />
        }
    }

    renderService = () => {
        if (this.state.detail_service.length !== 0) {
            return (
                <div>
                    {this.renderDetailService()}
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

    render (){
        return (
            <div className='mt-3 row'> 
                <div className='col-sm-10 mx-auto card'>
                <div className="position-relative" style={{margin: "2.5rem 5rem"}}>
                    <div className="progress" style={{height: "1px"}}>
                        <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button type="button" className="position-absolute translate-middle btn btn-sm btn-primary rounded-pill" style={{top:"0",left:"10px",width: "2rem", height:"2rem"}}>1</button>
                    <div className="position-absolute" style={{top:"20px",left:"-50px"}}>Booking Ruangan</div>
                    <button type="button" className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style={{width: "2rem", height:"2rem"}}>2</button>
                    <div className="position-absolute" style={{top:"20px",left:"96%"}}>Konfirmasi</div>
                </div>
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
                                <input className='form-control' type="text" ref={(input)=>{this.pic = input}}/>
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
                            <input className='form-control' type="text" ref={(input)=>{this.agenda = input}}/>
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
                        <button className='btn btn-primary my-3' onClick={()=>this.bookingConfirmation()}>
                            Kirim
                        </button>
                        {this.renderRedirect()}
                        {this.renderReservation()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Booking_Room