import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from "axios";

function StudentMainPage() {

    const location = useLocation();
    const history = useHistory();

    const [QuestionsList, setQuestionsList] = useState([]);

    useEffect(() => {
        if (!location.state) {
            history.replace("/");
        } else {
            console.log("logged in user: ", location.state.email);
            getQuestions();
        }
    }, []);

    const getQuestions = () => {
        console.log(location);
        axios.get(`http://localhost:3001/question/${location.state.year_sem}/${location.state.department}`).then(res => {
            console.log(res.data[0]);
            setQuestionsList(res.data);
        }).catch(err => console.log(err));
    }

    const goToAnswer = () => {
        let state = {
            email:"N160165@gmail.com",
            password:"123123",
            class:"CSE-2",
            year_sem:"ENG1",
            department:"CSE"
        }
        history.replace(`/studentAnswers`,state);
    }

    const goToAnswerId = (_id) => {
        let state = {
            _id,
            email: location.state.email,

        }
        history.push("/answer", state);
    }

    return (
        <div>
            <div className="snav bg-dark">
                <div>
                    <button className="btn  btn-outline-light">Questions</button>
                </div>
                <div>
                    <button className="btn btn-outline-light" onClick={goToAnswer}>
                        Answers
                    </button>
                </div>
            </div>

            <div className="question-item-head-white">
                <h6>Student Mail</h6>
                <h6>Show Answers</h6>
            </div>
            <div className="main">
                {
                    QuestionsList.length==0 &&
                    <div className="question-item">
                        NoQuestions Yet
                    </div>
                }
                {
                    QuestionsList.map((questionItem) => {
                        return (<div className="question-item">
                            <div>
                                {questionItem.Subject},
                                {questionItem.TypeOfExam}
                            </div>
                            <div>
                                {`${questionItem.fromTime} - ${questionItem.toTime}`}
                            </div>
                            <div>
                                <button className="btn btn-outline-dark" onClick={() => goToAnswerId(questionItem._id)}>answer test</button>
                            </div>
                        </div>)
                    })
                }

                {/* 
                Mcqs: Array []
                Questions: Array [ {…} ]
                Subject: "CNS"
                TypeOfExam: "Mid-1"
                __v: 0
                _id: "60eacb16d013181510620a6f"
                date: "2020-06-10"
                department: "CSE"
                email: "shanmukha"
                fromTime: "05:11"
                toTime: "03:11"
                year_sem: "ENG1"
                 */}
            </div>
        </div>
    )
}

export default StudentMainPage;