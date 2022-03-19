import React, { Component } from 'react'
import './Home.css';

class RoomSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            total_amount: 0,
            AddOn: ["TV","Speaker","Infocus","Mic","Mixer"],
            selected: [],
            isDisplayLab: 'd-none',
            activeSetup: false
        };
    }

    handleClickRuangan = () => this.props.onClick(this.props.index)

    handleClickSetup = () => {
            this.setState({ activeSetup: !this.state.activeSetup })
    }

    renderFeatures = () => {
        return this.props.fasilitas.map(fasilitas => {
            return (
                <li>{fasilitas}</li>
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

    render() {
        if (this.state.activeSetup) {
            let kapasitas = this.props.kapasitas.split(" ")
            return (
                <div className="mb-3"> 
                    <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ this.handleClickRuangan }>Room {this.props.index}</button>
                    <div className={this.props.isDisplay ? 'd-block' : 'd-none'}>
                        <button type="button" className="tombol2 btn btn-success" onClick={ this.handleClickSetup }>Save</button>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Kapasitas</span>
                            </div>
                            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={kapasitas[0]}/>
                        </div>
                        <div className='border-bottom border-secondary card-title d-flex'>
                            <b>Additional Request</b>
                        </div>
                        <div className="p-3">
                            {this.renderFasilitas()}
                        </div>
                    </div>
                </div>
            )
        } else{
            return (
                <div className="mb-3"> 
                    <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ this.handleClickRuangan }>Room {this.props.index}</button>
                    <div className={this.props.isDisplay ? 'd-block' : 'd-none'}>
                        <button type="button" className="tombol2 btn btn-primary" onClick={ this.handleClickSetup }>Setup</button>
                        <button type="button" className="tombol2 btn btn-danger" onClick={ this.handleClickRuangan }>Delete</button>
                        <div>
                            Kapasitas {this.props.kapasitas}
                        </div>
                        <div>
                            Facilities : 
                        </div>
                        {this.renderFeatures()}
                    </div>
                </div>
            )
        }
    }
}

export default RoomSetup