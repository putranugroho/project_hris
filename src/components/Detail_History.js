import React, { Component } from 'react'
import axios from 'axios'

import port from '../port'

class Detail_History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history : {
                        pemesan: {
                            nama: "Gumilang Febrian",
                            no_hp: "+628566300022",
                            tanggal: "29 Desember 2020",
                            email: "febrian.gumilang@example.com",
                            berkas: "Hanya Softcopy",
                            alamat: "Jl. Kalimalang Ruko Bougenville Blok A/1A, Jakarta, DKI Jakarta",
                            trans_id: "REG-20201212-1234",
                            klinik: "Tirta Mega Kuningan",
                            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel turpis nunc eget lorem dolor. Orci sagittis eu volutpat odio facilisis mauris sit amet. Nunc lobortis mattis aliquam faucibus purus in massa. Elementum tempus egestas sed sed risus pretium quam. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Maecenas accumsan lacus vel facilisis volutpat est velit. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Integer enim neque volutpat ac. Turpis egestas maecenas pharetra convallis posuere morbi. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Cursus vitae congue mauris rhoncus."
                        },
                        pasien: [
                            {
                                nama: "Bambang Sutoyo",
                                gender: "Laki - Laki",
                                nik: "31323121847321",
                                tanggal_lhr: "12/21/1960",
                                tempat_lhr: "Depok",
                                pekerjaan: "Karyawan",
                                alamat: "Jl. Kalimalang Ruko Bougenville Blok A/1A, Jakarta, DKI Jakarta",
                                service: ["Swab PCR Same Day, ", "Rapid Swab Antigen, ", "Tes Serologi"]
                            },
                            {
                                nama: "Gumilang Febrian",
                                gender: "Perempuan",
                                nik: "31323121847321",
                                tanggal_lhr: "12/21/1960",
                                tempat_lhr: "Depok",
                                pekerjaan: "Karyawan",
                                alamat: "Jl. Kalimalang Ruko Bougenville Blok A/1A, Jakarta, DKI Jakarta",
                                service: ["Swab PCR Same Day, ", "Rapid Swab Antigen"]
                            },
                            {
                                nama: "Mega Aulia",
                                gender: "Perempuan",
                                nik: "31323121847321",
                                tanggal_lhr: "12/21/1960",
                                tempat_lhr: "Depok",
                                pekerjaan: "Karyawan",
                                alamat: "Jl. Kalimalang Ruko Bougenville Blok A/1A, Jakarta, DKI Jakarta",
                                service: ["Rapid Swab Antigen"]
                            }
                        ],
                        detail_pesanan: [
                            {
                                nama: "Swab PCR Same Day",
                                count: 2,
                                value: 2200000
                            },
                            {
                                nama: "Rapid Swab Antigen",
                                count: 3,
                                value: 750000
                            },
                            {
                                nama: "Tes Serologi",
                                count: 1,
                                value: 250000
                            }
                        ]
                    },
                isDisplay: 0,
                total_amount: 0
            }
    }
    
    componentDidMount(){
        // let trans_id = this.props.match.params.trans_id
        
        // axios.get(port + trans_id)
        // .then(res => {
            //     this.setState({history: res.data})
            // })
        this.updateTotal()
    }


    handleClick = (index) => {
        if (index === this.state.isDisplay) {
            this.setState({isDisplay:null})
        } else {
            this.setState({isDisplay:index})
        }
    }

    renderPemesan = () => {
        var {nama, no_hp, email, tanggal, berkas, alamat, trans_id, klinik, note} = this.state.history.pemesan
        return (
            <div className='mx-auto card mb-3'>
                <div className='card-body'>
                    <div className="card-title d-flex">
                    <h1 style={{marginRight:"20px"}}>Register</h1>
                    <h1>({trans_id})</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            Nama PIC
                        </div>
                        <div className="col-sm-3">
                            No Handphone
                        </div>
                        <div className="col-sm-4">
                            Email
                        </div>
                        <div className="col-sm-3">
                            Apakah Anda memerlukan hardcopy?
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-sm-2">
                            {nama}
                        </div>
                        <div className="col-sm-3">
                            {no_hp}
                        </div>
                        <div className="col-sm-4">
                            {email}
                        </div>
                        <div className="col-sm-3">
                            {berkas}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            Klinik
                        </div>
                        <div className="col-sm-3">
                            Tanggal Home Care
                        </div>
                        <div className="col-sm-4">
                            Alamat
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-sm-2">
                            {klinik}
                        </div>
                        <div className="col-sm-3">
                            {tanggal}
                        </div>
                        <div className="col-sm-4">
                            {alamat}
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

    renderPasien = () => {
        var pasien = this.state.history.pasien
        return pasien.map(data => {
            return (
                <div>
                    <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ ()=> this.handleClick(pasien.indexOf(data)) }>{data.nama}</button>
                    <div className={this.state.isDisplay == pasien.indexOf(data) ? 'd-block' : 'd-none'}>
                        <div className="row">
                            <div className="col-sm-2">
                                Jenis Kelamin
                            </div>
                            <div className="col-sm-3">
                                Tempat Lahir
                            </div>
                            <div className="col-sm-4">
                                Tanggal Lahir
                            </div>
                            <div className="col-sm-3">
                                Service
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-sm-2">
                                {data.gender}
                            </div>
                            <div className="col-sm-3">
                                {data.tempat_lhr}
                            </div>
                            <div className="col-sm-4">
                                {data.tanggal_lhr}
                            </div>
                            <div className="col-sm-3">
                                {data.service}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                                NIK (KTP)
                            </div>
                            <div className="col-sm-3">
                                Pekerjaan
                            </div>
                            <div className="col-sm-4">
                                Alamat
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-sm-2">
                                {data.nik}
                            </div>
                            <div className="col-sm-3">
                                {data.pekerjaan}
                            </div>
                            <div className="col-sm-4">
                                {data.alamat}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderDetail = () => {
        var detail_pesanan = this.state.history.detail_pesanan
        return detail_pesanan.map(detail => {
            return (
                <div className="d-flex navbar border-bottom border-secondary py-2">
                    <div className="col-7">
                        {detail.nama}
                    </div>
                    <div className="col-3">
                        X {detail.count}
                    </div>
                    <div className="col-2">
                        Rp. {detail.value.toLocaleString('id-ID')}
                    </div>
                </div>
            )
        })
        
    }

    updateTotal = () => {
        var detail_pesanan = this.state.history.detail_pesanan
        var total_amount = 0

        for (let i = 0; i < detail_pesanan.length; i++) {
            total_amount = total_amount + detail_pesanan[i].value
        }
        
        this.setState({total_amount})
    }
    
    render() {
        var pasien = this.state.history.pasien
        var total_amount = this.state.total_amount
            return (
                <div className='card-body'>     
                    {this.renderPemesan()}
                    <div className='mx-auto card mb-3'>
                        <div className='card-body'> 
                            <div className="card-title d-flex">
                                <h1 style={{marginRight:"20px"}}>Pasien</h1>
                                <h1>({pasien.length} Pasien)</h1>
                            </div>
                        {this.renderPasien()}
                        </div>
                    </div>
                    <div className='mx-auto card mb-3'>
                        <div className='card-body'> 
                            <div className="card-title d-flex">
                                <h1 style={{marginRight:"20px"}}>Pasien</h1>
                                <h1>({pasien.length} Pasien)</h1>
                            </div>
                            {this.renderDetail()}
                            <div className="d-flex navbar py-2">
                                <div className="col-10">
                                    Total Amount
                                </div>
                                <div className="col-2">
                                    Rp. {total_amount.toLocaleString('id-ID')}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <img className='list' alt='' style={{width: 150, height: 150}} src={`http://localhost:2019/products/avatar/${image}`}/>
                    <div className='card-body'>
                        <h5 className='card-title'>{product_name}</h5>
                        <p className='card-text'>{detail}</p>
                        <p className='card-text'>Rp. {price}</p>
                        <button className='btn btn-outline-primary btn-block'>Detail</button>
                        <button className='btn btn-primary btn-block'>Add To Cart</button>
                    </div> */}
                </div>
            )
    }
}

export default Detail_History