import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import RoomSetup from './RoomSetup'

class Meeting_Room_Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            activeRuangan: null
        };
    }

    handleClickRuangan = (index) => {
        if (index === this.state.activeRuangan) {
            this.setState({ activeRuangan: null })
        } else {
            this.setState({ activeRuangan: index })
        }
    }

    renderRuangan = () => {
        return this.state.ruangan.map(ruangan => {
            return (
                <RoomSetup value={this.state.services} index={ruangan.id} kapasitas={ruangan.kapasitas} fasilitas={ruangan.fasilitas} isDisplay={ this.state.activeRuangan===ruangan.id } onClick={ this.handleClickRuangan } onChange={ this.handleOnChange }/>
            )
        })
    }

    addRuangan = () => {
        let newRuangan = {}
        let ruangan = this.state.ruangan
        newRuangan["id"] = ruangan.length+1
        newRuangan["kapasitas"] = "orang"
        newRuangan["fasilitas"] = []
        ruangan.push(newRuangan)
        this.setState({ruangan})
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
        
    render () {
        return (
            <div className='mt-3 row'> 
                <div className='col-sm-10 mx-auto card'>
                    <div className='card-body'>
                        <div className='border-bottom border-secondary card-title d-flex'>
                            <h2>Meeting Room</h2>
                         </div>
                        {this.renderRuangan()}
                    <button type="button" className="tombol2 btn btn-primary" onClick={()=>this.addRuangan()}>Add Room</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Meeting_Room_Setup