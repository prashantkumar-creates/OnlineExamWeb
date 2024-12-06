import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from "axios";

function ViewExam() {

    const location = useLocation();
    const history = useHistory();
    const [questions, setquestions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/question/email/${location.state.email}`).then(
            res => {
                console.log(res.data);
                setquestions(res.data);
            }
        ).catch(err => console.log(err));
    }, [])

    let goTo = (url) => {
        let state = location.state
        history.push(url, state);
    }

    return (
        <div className="mx-width d-flex">
            {questions.map((x, i) => {
                console.log(x)
                return (
                    <div key={i} className="smain-width-50prcnt d-flex justify-content-between">
                        <div>
                            <h3>{x.Subject}</h3>
                            <h6>{x.year_sem} {x.TypeOfExam}</h6>
                            <h6>{x.department}</h6>
                            <h6>{x.date}</h6>
                        </div>
                        <div>
                        <button className="btn btn-outline-secondary m-1 equal-width-btns" onClick={() => goTo(`teacher/update/${x._id}`)}>update</button>
                        <br />
                        <button className="btn btn-outline-secondary m-1 equal-width-btns" onClick={() => goTo(`teacher/responces/${x._id}`)}>view responces</button>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default ViewExam;