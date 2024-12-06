import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from "axios";

function StudentLogin() {

    const history = useHistory();

    const goToStudentMainPage = () => {
        let newState = {
            email:"N160165@gmail.com",
            password:"123123",
            class:"CSE-2",
            year_sem:"ENG1",
            department:"CSE"
        }
        history.push(`/studentMainPage`, newState);
    }

    return (
        <div>
            <nav>
                
            </nav>
            <div>
                studentLogin
                <button onClick={goToStudentMainPage}>Login</button>
            </div>
        </div>
    )
}

export default StudentLogin
