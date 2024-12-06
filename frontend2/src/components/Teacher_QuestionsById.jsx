import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from "axios";

function Teacher_QuestionsById() {
    const location = useLocation();
    const history = useHistory();

    const [Questions, setQuestions] = useState([]);
    let _id = location.pathname.split('/')[3];

    useEffect(() => {
        getFunction()
    }, []);

    const getFunction = () => {
        console.log(_id);
        axios.get(`http://localhost:3001/answer/findByQid/${_id}`).then(
            res => {
                console.log(res.data);
                setQuestions(res.data);
            }
        ).catch(err => console.log(err));
    }

    let goTo = (qid, index) => {
        let state = location.state
        let newState = [
            state,
            { studentEmail: Questions[index].email }
        ]
        history.push(`/teacher/studentAnswer/${_id}/${qid}`, newState);
    }

    return (
        <div>
            <div className="question-item-head">
                <h6>Student Mail</h6>
                <h6>Show Answers</h6>
            </div>
            {
                Questions.length == 0 && 
                <div className="question-item">
                <h5>No Resonces Yet</h5>
            </div>
            }
            {Questions.map((questions2, index) => {
                return (
                    <div className="question-item">
                        {questions2.email}
                        <button className="btn btn-outline-dark" onClick={() => goTo(questions2._id, index)}>check Answer</button>
                    </div>
                )

            })}
        </div>
    )
}

// {questions2.Questions.map((question) => {
//     return (
//         <div>
//             {question.studentAnswer}
//         </div>
//     )
// })}
export default Teacher_QuestionsById