import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Booking_Room.css';

import RoomItem from './RoomItem'
import PatientItem from './PatientItem'

class Booking_Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            redirect: false,
            peserta: [],
            activePeserta: null,
            AddOn: ["TV","Speaker","Infocus","Mic","Mixer"],
            newAddOn: [],
            ruangan: [
                {
                    id: 1,
                    kapasitas: "20 Orang",
                    fasilitas: ["TV","Speaker","Infocus","Mic"]
                },{
                    id: 2,
                    kapasitas: "20 Orang",
                    fasilitas: ["TV","Speaker","Infocus","Mic"]
                },{
                    id: 3,
                    kapasitas: "10 Orang",
                    fasilitas: ["TV","Infocus"]
                },{
                    id: 4,
                    kapasitas: "5 Orang",
                    fasilitas: ["TV","Infocus"]
                },{
                    id: 5,
                    kapasitas: "50 Orang",
                    fasilitas: ["TV","Speaker","Infocus","Mic","Mixer"]
                }
            ],
            activeRuangan: null,
            services: [],
            detail_service: [],
            total_amount: 0
        };
    }

    componentDidUpdate(prevState){
        this.renderRuangan()
    }
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
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

    handleClickRuangan = (index) => {
        if (index === this.state.activeRuangan) {
            this.setState({ activeRuangan: null })
        } else {
            this.setState({ activeRuangan: index })
        }
    }

    handleClickPeserta = (index) => {
        if (index === this.state.activePeserta) {
            this.setState({ activePeserta: null })
        } else {
            this.setState({ activePeserta: index })
        }
    }

    handleOnChange = value => {
        let detail_service = this.state.detail_service
        let reset = this.state.reset
        console.log(reset);
        if (value.length) {
            this.setState({ AddOn: reset })
            console.log(this.state.AddOn);
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
        var total_amount = 0
        for (let i = 0; i < detail_service.length; i++) {
            total_amount = total_amount + parseInt(detail_service[i].value)
        }
        this.setState({total_amount})
    }

    renderRuangan = () => {
        return this.state.ruangan.map(ruangan => {
            return (
                <RoomItem value={this.state.services} index={ruangan.id} kapasitas={ruangan.kapasitas} fasilitas={ruangan.fasilitas} isDisplay={ this.state.activeRuangan===ruangan.id } onClick={ this.handleClickRuangan } onChange={ this.handleOnChange }/>
            )
        })
    }

    
    addService = () => this.setState({redirect: true})
    
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    renderService = () => {
        if (this.state.detail_service.length != 0) {
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

    renderPeserta = () => {
        return this.state.peserta.map(peserta => {
            return (
                <PatientItem value={this.state.services} index={peserta} isDisplay={ this.state.activePeserta===peserta } onClick={ this.handleClickPeserta } onChange={ this.handleOnChange }/>
            )
        })
    }

    renderFasilitas = () => {
        return this.state.AddOn.map(addon => {
            return (
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id={addon} value={addon}/>
                    <label class="form-check-label" for={addon}>{addon}</label>
                </div>
            )
        })
    }

    addPeserta = () => {
        let newPeserta = []
        let addPeserta = this.state.peserta.length+1
        for (let i = 1; i <= addPeserta; i++) {
            newPeserta.push(i)
        }
        this.setState({ peserta: newPeserta})
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
        //                             <input type="checkbox" class="btn-check" id={addon.id} autocomplete="off"/>
        //                             <label class="btn btn-outline-primary mx-2" for={addon.id}>{addon.fasilitas}</label>
        //                         </div>
        //                     )
        //                 } else {
        //                     return(
        //                         <div>
        //                             <input type="checkbox" class="btn-check" id={addon.id} autocomplete="off"/>
        //                             <label class="btn btn-outline-info mx-2" disabled for={addon.id}>{addon.fasilitas}</label>
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
        //             <input type="checkbox" class="btn-check" id={AddOn} autocomplete="off"/>
        //             <label class="btn btn-outline-primary mx-2" for={AddOn}>{AddOn}</label>
        //         </div>
        //     )
        // })
    // }

    render (){
        return (
            <div> 
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
                            <div className='border-bottom border-secondary card-title d-flex'>
                                <h2>Meeting Participants</h2>
                                <span className='align-self-center mx-3'>Jumlah dan data peserta</span>
                            </div>
                            <div className='card-title'>
                                <div  style={{fontWeight: "600"}}>Jumlah Peserta</div>
                            </div>
                            <form className='input-group mb-3'>
                                <input className='form-control' type="text" ref={(input)=>{this.nama = input}}/>
                            </form>
                            {this.renderPeserta()}
                            <button className='btn btn-primary my-3' onClick={this.addPeserta}>
                                Tambah Peserta
                            </button>
                            {/* {this.Addon()} */}
                            <div className='border-bottom border-secondary card-title d-flex'>
                                <h2>Additional Request</h2>
                            </div>
                            <div className="p-3">
                                {this.renderFasilitas()}
                            </div>
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
            </div>
        )
    }
}

export default Booking_Room