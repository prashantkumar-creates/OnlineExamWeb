import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

function JsonShow() {

    const location = useLocation();
    const _id = location.pathname.split('/')[2];
    const [details, setdetails] = useState({
        _id: "",
        name: "",
        password: "",
        email: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/student/${_id}`).then(res => {
            console.log(res.data);
            setdetails(res.data);
        }).catch(err => console.log(err));
    }, []);
    
    return (
        <div>
            hi
            <hr />
            {_id}
            <br />
            {
                details._id
            }
            <br />
            {
                details.name
            }
            <br />
            {
                details.password
                // details
            }
        </div>
    )
}

export default JsonShow
