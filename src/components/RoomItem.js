import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class RoomItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            total_amount: 0,
            selected: [],
            isDisplayLab: 'd-none'
        };
    }

    handleClickRuangan = () => this.props.onClick(this.props.index)

    selectTime = (time) => {
        let time_slot = this.props.time_slot
        for (let i = 0; i < time_slot.length; i++) {
            if (time_slot[i].id === time) {
                return (`Jam ${time_slot[i].time} ~ ${time_slot[i+1].time}`)
            }
        }
    }
    
    selectButton = (ruangan) => {
        let id = parseInt(ruangan.toString().substring(2,4))
        let ruangan_id = parseInt(ruangan.toString().substring(0,1))
        let service = this.state.selected
        let selectTime = this.selectTime(id)
        if (document.getElementById(ruangan).classList.contains('btn-outline-primary')){
            document.getElementById(ruangan).className = "btn btn-lg btn-primary m-2";
            let selectedItem = {
                id,
                ruangan_id,
                value: `Room ${this.props.index} | ${selectTime}`
            }
            service.push(selectedItem)
            this.setState({ selected: service})
            this.props.onChange(selectedItem)
        } else if (document.getElementById(ruangan).classList.contains('btn-primary')){
            document.getElementById(ruangan).className = "btn btn-lg btn-outline-primary m-2";
            let removeItem = []
            for (let i = 0; i < this.state.selected.length; i++) {
                if (this.state.selected[i].id === id) {
                    removeItem.push(this.state.selected[i])
                    this.state.selected.splice(i, 1);
                }
            }
            this.setState({ selected: service})
            this.props.onChange(removeItem)
        }
    }

    renderCalender = () => {
        const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
          <button className="btn btn-outline-secondary" type="button" onClick={onClick} ref={ref}>
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

    renderFeatures = () => {
        return this.props.fasilitas.map(fasilitas => {
            if (fasilitas.status === 1) {
                return (
                    <li>{fasilitas.facility_name}</li>
                )
            }
        })
    }

    renderTimeSlot = () => {
        return this.props.time_slot.map(time_slot => {
            if (time_slot.status === 1) {
                return (
                    <button id={`${this.props.index}-${time_slot.id}`} type="button" className="btn btn-lg btn-outline-primary m-2" onClick={()=> this.selectButton(`${this.props.index}-${time_slot.id}`)}>{time_slot.time}</button>
                )
            } else if (time_slot.status === 0) {
                return (
                    <button id={`${this.props.index}-${time_slot.id}`} type="button" className="btn btn-lg btn-outline-primary m-2" disabled onClick={()=> this.selectButton(`${this.props.index}-${time_slot.id}`)}>{time_slot.time}</button>
                )
            }
        })
    }

    render() {
        return (
            <div className="mb-3"> 
                <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ this.handleClickRuangan }>Room {this.props.name}</button>
                <div className={this.props.isDisplay ? 'd-block' : 'd-none'}>
                    <div>
                        Kapasitas : {this.props.kapasitas} Orang
                    </div>
                    <div>
                        Facilities : 
                    </div>
                    {this.renderFeatures()}
                    {this.renderTimeSlot()}
                </div>
            </div>
        )
    }
}

export default RoomItem