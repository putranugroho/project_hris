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
        let clock = 8
        for (let i = 1; i < time; i++) {
            clock++
        }
        return `Jam ${clock}.00 ~ Jam ${clock+1}.00`
    }
    
    selectButton = (ruangan) => {
        let ruangan_id = parseInt(ruangan.toString().substring(2,4))
        let service = this.state.selected
        if (document.getElementById(ruangan).classList.contains('btn-outline-primary')){
            document.getElementById(ruangan).className = "btn btn-lg btn-primary m-2";
            let selectedItem = {
                id: ruangan_id,
                value: `Room ${this.props.index} | ${this.selectTime(ruangan_id)}`
            }
            service.push(selectedItem)
            this.setState({ selected: service})
            this.props.onChange(selectedItem)
        } else if (document.getElementById(ruangan).classList.contains('btn-primary')){
            document.getElementById(ruangan).className = "btn btn-lg btn-outline-primary m-2";
            let removeItem = []
            for (let i = 0; i < this.state.selected.length; i++) {
                if (this.state.selected[i].id === ruangan_id) {
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
            return (
                <li>{fasilitas}</li>
            )
        })
    }

    render() {
        return (
            <div className="mb-3"> 
                <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ this.handleClickRuangan }>Room {this.props.index}</button>
                <div className={this.props.isDisplay ? 'd-block' : 'd-none'}>
                    <div>
                        Kapasitas {this.props.kapasitas}
                    </div>
                    <div>
                        Features : 
                    </div>
                    {this.renderFeatures()}
                    <button id={`${this.props.index}-1`} type="button" className="btn btn-lg btn-outline-primary m-2" onClick={()=> this.selectButton(`${this.props.index}-1`)}>08.00</button>
                    <button id={`${this.props.index}-2`} type="button" className="btn btn-lg btn-outline-primary m-2" onClick={()=> this.selectButton(`${this.props.index}-2`)}>09.00</button>
                    <button id={`${this.props.index}-3`} type="button" className="btn btn-lg btn-outline-info m-2" onClick={()=> this.selectButton(`${this.props.index}-3`)}disabled>10.00</button>
                    <button id={`${this.props.index}-4`} type="button" className="btn btn-lg btn-outline-info m-2" onClick={()=> this.selectButton(`${this.props.index}-4`)}disabled>11.00</button>
                    <button id={`${this.props.index}-5`} type="button" className="btn btn-lg btn-outline-primary m-2" onClick={()=> this.selectButton(`${this.props.index}-5`)}>12.00</button>
                    <button id={`${this.props.index}-6`} type="button" className="btn btn-lg btn-outline-primary m-2" onClick={()=> this.selectButton(`${this.props.index}-6`)}>13.00</button>
                    <button id={`${this.props.index}-7`} type="button" className="btn btn-lg btn-outline-info m-2" onClick={()=> this.selectButton(`${this.props.index}-7`)}disabled>14.00</button>
                    <button id={`${this.props.index}-8`} type="button" className="btn btn-lg btn-outline-info m-2" onClick={()=> this.selectButton(`${this.props.index}-8`)}disabled>15.00</button>
                    <button id={`${this.props.index}-9`} type="button" className="btn btn-lg btn-outline-info m-2" onClick={()=> this.selectButton(`${this.props.index}-9`)}disabled>16.00</button>
                    <button id={`${this.props.index}-10`} type="button" className="btn btn-lg btn-outline-primary m-2" onClick={()=> this.selectButton(`${this.props.index}-10`)}>17.00</button>
                    <button id={`${this.props.index}-11`} type="button" className="btn btn-lg btn-outline-primary m-2" onClick={()=> this.selectButton(`${this.props.index}-11`)}>18.00</button>
                    <button id={`${this.props.index}-12`} type="button" className="btn btn-lg btn-outline-info m-2" onClick={()=> this.selectButton(`${this.props.index}-12`)}disabled>19.00</button>
                    <button id={`${this.props.index}-13`} type="button" className="btn btn-lg btn-outline-primary m-2" onClick={()=> this.selectButton(`${this.props.index}-13`)}>20.00</button>
                    <button id={`${this.props.index}-14`} type="button" className="btn btn-lg btn-outline-primary m-2" onClick={()=> this.selectButton(`${this.props.index}-14`)}>21.00</button>
                </div>
            </div>
        )
    }
}

export default RoomItem