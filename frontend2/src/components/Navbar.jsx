import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {

    let history = useHistory();

    const go = () =>{
        history.replace("/home2");
    }

    return (
        <div>
            <Link to="/">Home</Link><br />
            <Link to="/home1">Home1</Link><br />            
            <button onClick={go} type="button" className="btn btn-outline-primary">click</button>

        </div>
    )
}

export default Navbar
