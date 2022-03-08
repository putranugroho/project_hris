import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    nama: "Gumilang",
                    tanggal: "29 Desember 2020",
                    alamat: "Jl. Kalimalang Ruko Bougenville Blok A/1A, Jakarta, DKI Jakarta",
                    trans_id: "REG-20201212-1234",
                    klinik: "Tirta Mega Kuningan",
                    pasien: ["Bambang", "Gumilang", "Mega Aulia"]
                },
                {
                    nama: "Gumilang",
                    tanggal: "29 Desember 2020",
                    alamat: "Jl. Danau Sunter Utr Perk Sunter Permai BI A/16, Sunter Agung",
                    trans_id: "REG-20201212-3221",
                    klinik: "Tirta Kramat Raya",
                    pasien: ["Gumilang", "Bambang", "Mega Aulia"]
                },
                {
                    nama: "Gumilang",
                    tanggal: "28 Desember 2020",
                    alamat: "Jl. Kalimalang Ruko Bougenville Blok A/1A, Jakarta, DKI Jakarta",
                    trans_id: "REG-20201212-5332",
                    klinik: "Tirta Mega Kuningan",
                    pasien: ["Bambang", "Gumilang"]
                },
                {
                    nama: "Gumilang",
                    tanggal: "29 Desember 2020",
                    alamat: "Jl. Danau Sunter Utr Perk Sunter Permai BI A/16, Sunter Agung",
                    trans_id: "REG-20201212-8676",
                    klinik: "Tirta Mega Kuningan",
                    pasien: ["John Doe", "Bambang", "Gumilang", "Mega Aulia", "Samsul"]
                },  
            ]
        };
    }

    renderHistory = () => {
        return this.state.data.map(data => {
            return (
                <Link to={'/detailhistory/' + data.trans_id} style={{textDecoration: "none", color: "black"}}>
                    <div className="card-title mt-2 border p-3">
                        <div>{data.tanggal}</div>
                        <div className="row mb-3">
                            <div className="col-sm-6">
                                <div className='card-title'>
                                    <div  style={{fontWeight: "600"}}>{data.nama}</div>
                                </div>
                                <div>
                                    {data.alamat}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className='card-title'>
                                    <div  style={{fontWeight: "600"}}>{data.trans_id}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-4">
                                        Klinik
                                    </div>
                                    <div className="col-sm-8">
                                        {data.klinik}
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-4">
                                        Pasien
                                    </div>
                                    <div className="col-sm-8">
                                        {data.pasien[0]} and +{data.pasien.length-1} Patient
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })
    }
        
    render () {
        return (
            <div> 
                <div className='p-5 row bg-secondary'>
                    <div className='col-sm-11 mx-auto border p-4 rounded-3 bg-white'>
                        <h1 className="">My Appointment</h1>
                        <h4 className="mt-3 text-start">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</h4>
                        <div style={{textAlign: "right"}}>
                            <input type="text" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        {this.renderHistory()}
                    </div>
                </div>
            </div>
        )
    }
}

export default History