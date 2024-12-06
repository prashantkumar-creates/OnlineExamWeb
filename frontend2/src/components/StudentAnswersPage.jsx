import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from "axios";


function StudentAnswersPage() {

    const location = useLocation();
    const history = useHistory();

    const [AnswersList, setAnswersList] = useState([]);

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
        axios.get(`http://localhost:3001/studentAnswerByMail/${location.state.email}`).then(res => {
            console.log(res.data[0]);
            setAnswersList(res.data);
        }).catch(err => console.log(err));
    }

    const goToAnswerId = (_id, questionId) => {
        location.state.answerId = _id;
        location.state.questionId = questionId;
        history.push(`/studentEachAnswer`, location);
    }

    const goToQuestions = () => {
        let state = {
            email: "N160165@gmail.com",
            password: "123123",
            class: "CSE-2",
            year_sem: "ENG1",
            department: "CSE"
        }
        history.replace("/studentMainPage", state);
    }

    return (
        <div>
            <div className="snav bg-dark">
                <div>
                    <button className="btn btn-outline-light" onClick={goToQuestions}>Questions</button>
                </div>
                <div>
                    <button className="btn btn-outline-light" >
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
                    AnswersList.length == 0 &&
                    <div className="question-item">
                        You haven't answered Yet
                    </div>
                }
                {
                    AnswersList.map((answerItem) => {
                        return (<div className="question-item">
                            <div>
                                {answerItem.Subject},
                                {answerItem.TypeOfExam}
                            </div>
                            <div>
                                <button className="btn btn-outline-dark" onClick={() => goToAnswerId(answerItem._id, answerItem.questionId)}>Show my answer</button>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default StudentAnswersPage
