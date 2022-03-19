import React, { Component } from 'react'
import './Home.css';
import "react-datepicker/dist/react-datepicker.css";

class Account_Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: [
                {
                    nama: "Bambang Sutoyo",
                    email: "bambang.sutoyo@gmail.com",
                    no_hp: "081212349876",
                    level: "1"
                },
                {
                    nama: "Gumilang Febrian",
                    email: "gumilang.febrian@gmail.com",
                    no_hp: "081298761234",
                    level: "2"
                },
                {
                    nama: "Mega Aulia",
                    email: "mega.aulia@gmail.com",
                    no_hp: "081243216789",
                    level: "3"
                }
            ],
            selected: "",
            setup: "",
            activeSetup: false
        };
    }

    handleClickAccount = (nama) => {
        if (this.state.selected === nama) {
            this.setState({ selected: ""})
        } else {
            this.setState({ selected: nama})
        }
    }

    handleClickSetup = (nama) => {
        if (this.state.setup === nama) {
            this.setState({ setup: ""})
        } else {
            this.setState({ setup: nama})
        }
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

    renderAccount = () => {
        return this.state.account.map(account => {
            if (this.state.setup === account.nama) {
                return(
                    <div className="mb-3"> 
                        <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ () => this.handleClickAccount(account.nama) }>{account.nama}</button>
                        <div className={this.state.selected === account.nama ? 'd-block' : 'd-none'}>
                            <button type="button" className="tombol2 btn btn-success" onClick={ () => this.handleClickSetup(account.nama) }>Save</button>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder={account.email}/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">No Handphone</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder={account.no_hp}/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Level</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder={account.level}/>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return(
                    <div className="mb-3"> 
                        <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ () => this.handleClickAccount(account.nama) }>{account.nama}</button>
                        <div className={this.state.selected === account.nama ? 'd-block' : 'd-none'}>
                            <button type="button" className="tombol2 btn btn-primary" onClick={ () => this.handleClickSetup(account.nama) }>Setup</button>
                            <button type="button" className="tombol2 btn btn-danger" onClick={ this.handleClickRuangan }>Delete</button>
                            <div className="row mb-3">
                            <div className="col-sm-2">
                                <b>Email :</b>
                            </div>
                            <div className="col-sm-3">
                                {account.email}
                            </div>
                            <div className="col-sm-2">
                                <b>No Hp :</b>
                            </div>
                            <div className="col-sm-3">
                                {account.no_hp}
                            </div>
                            <div className="col-sm-1">
                                <b>Level :</b>
                            </div>
                            <div className="col-sm-1">
                                {account.level}
                            </div>
                        </div>
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
                            <h2>Account Setup</h2>
                         </div>
                         {this.renderAccount()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Account_Setup