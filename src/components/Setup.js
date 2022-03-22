import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Setup extends Component {
    
    render(){
        return (
            <div> 
                <div className='mt-3 row'> 
                    <div className='col-10 mx-auto'>
                        <Link to={"/meeting_setup"}><button type="button" className="tombol btn btn-lg btn-primary my-4">Meeting Room Setup</button></Link>
                        <Link to={"/facilities_setup"}><button type="button" className="tombol btn btn-lg btn-primary my-4">Facilities Setup</button></Link>
                        <Link to={"/account_setup"}><button type="button" className="tombol btn btn-lg btn-primary my-4">Account Setup</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Setup