import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ParticipantItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            total_amount: 0,
            selected: [],
            isDisplayLab: 'd-none'
        };
    }

    handleClick = () => this.props.onClick(this.props.index)
    
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

    handleOnChange = e => {
        const item = e.target.id;
        const isChecked = e.target.checked;
        const value = e.target.value;

        let service = this.state.selected
        
        if (isChecked === true) {
            let selectedItem = {
                id: item,
                value: value
            }
            service.push(selectedItem)
            this.setState({ total_amount: this.state.total_amount+parseInt(value)})
            this.setState({ selected: service})
            this.props.onChange(selectedItem)
        } else if (isChecked === false) {
            let removeItem = []
            for (let i = 0; i < this.state.selected.length; i++) {
                if (this.state.selected[i].id === item) {
                    removeItem.push(this.state.selected[i])
                    this.state.selected.splice(i, 1);
                }
            }
            this.setState({ total_amount: this.state.total_amount-parseInt(value)})
            this.setState({ selected: service})
            this.props.onChange(removeItem)
        }
    }

    renderService = () => {
        return this.state.selected.map(selected => {
            return (
                <div className="d-flex navbar border-bottom border-secondary py-2">
                    <div>
                        {selected.id}
                    </div>
                    <div>
                        {selected.value}
                    </div>
                </div>
            )
        })
    }

    openLab = e => {
        const isChecked = e.target.checked;
        if (isChecked === true) {
            this.setState({ isDisplayLab: 'd-block'})
        } else if (isChecked === false) {
            this.setState({ isDisplayLab: 'd-none'})
        }
    }

    render() {
        return (
            <div className="mb-3"> 
                <button className="btn btn-outline-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" style={{width:"100%",textAlign: "left"}} onClick={ this.handleClick }>Peserta {this.props.index}</button>
                <div className={this.props.isDisplay ? 'd-block' : 'd-none'}>
                    <div className='card-title'>
                        <div  style={{fontWeight: "600"}}>Nama Lengkap</div>
                    </div>
                    <form className='input-group mb-3'>
                        <input id={`nama-peserta${this.props.index}`} className='form-control' type="text" ref={(input)=>{this.nama = input}}/>
                    </form>
                    <div className='card-title'>
                        <div  style={{fontWeight: "600"}}>Nomer Handphone</div>
                    </div>
                    <form className='input-group mb-3'>
                        <input id={`hp-peserta${this.props.index}`} className='form-control' type="text" ref={(input)=>{this.hp = input}}/>
                    </form>
                    <div className='card-title d-flex '>
                        <div style={{fontWeight: "600"}}>Alamat Email</div>
                        <div className="form-check form-switch mx-3">
                            <input className="form-check-input" type="checkbox" id={`checkbox${this.props.index}`}/>
                            <label className="form-check-label" for="flexSwitchCheckDefault">Send Email</label>
                        </div>
                    </div>
                    <form className='input-group mb-3'>
                        <input id={`email-peserta${this.props.index}`} className='form-control' type="text" ref={(input)=>{this.email = input}}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default ParticipantItem