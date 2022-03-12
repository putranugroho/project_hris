import React, { Component } from 'react'
import './Home.css';
import "react-datepicker/dist/react-datepicker.css";

class Facilities_Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddOn: ["TV","Speaker","Infocus","Mic","Mixer"],
            selected: "",
            activeSetup: false
        };
    }

    handleClickRuangan = () => this.props.onClick(this.props.index)

    handleClickSetup = (addon) => {
            this.setState({ selected: addon})
    }
    
    handleClickSave = () => {
        let input = document.getElementById("newFacilities").value;
        let AddOn = this.state.AddOn
        let length = this.state.AddOn.length-1
        AddOn[length] = input
        this.setState({AddOn})
    }
    
    handleClickCancel = () => {
        let AddOn = this.state.AddOn
        AddOn.pop()
        this.setState({AddOn})
    }

    handleClickDelete = (id) => {
        let AddOn = this.state.AddOn
        let index = AddOn.indexOf(id)
        AddOn.splice(index, 1);
        this.setState({AddOn})
    }
    
    addFacilities = () => {
        let AddOn = this.state.AddOn
        AddOn.push("")
        this.setState({AddOn})
    }

    renderFasilitas = () => {
        return this.state.AddOn.map(addon => {
            if (addon === "") {
                return (
                    <div className="input-group mb-3">
                        <input id="newFacilities" type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={()=>this.handleClickSave()}>Save</button>
                            <button className="btn btn-danger" type="button" onClick={()=>this.handleClickCancel()}>Cancel</button>
                        </div>
                    </div>
                )
            } else if (this.state.selected === addon) {
                return (
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" placeholder={addon}/>
                        <div className="input-group-append">
                            <button className="btn btn-success" type="button" onClick={()=>this.handleClickSetup("")}>Save</button>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="input-group mb-3">
                        <span className="input-group-text form-control" id="">{addon}</span>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={()=>this.handleClickSetup(addon)}>Edit</button>
                            <button className="btn btn-danger" type="button" onClick={()=>this.handleClickDelete(addon)}>Delete</button>
                        </div>
                    </div>
                )
            }
        })
    }

    render() {
        return (
            <div className='mt-3 row'> 
                <div className='col-sm-10 mx-auto card'>
                    <div className='card-body'>
                        <div className='border-bottom border-secondary card-title d-flex'>
                            <h2>Room Facilities</h2>
                         </div>
                         {this.renderFasilitas()}
                    <button type="button" className="tombol2 btn btn-primary" onClick={()=>this.addFacilities()}>Add Facilities</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Facilities_Setup