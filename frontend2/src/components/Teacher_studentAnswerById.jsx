import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from "axios";

function Teacher_studentAnswerById() {
    const location = useLocation();
    const history = useHistory();

    const [Answers, setAnswers] = useState([]);
    const [Questions, setQuestions] = useState({
        "Answers": {
            "_id": "60d74a33b81eae2288e3a7e0",
            "questionId": "60d37ed792868625ec28e998",
            "email": "apple@gmail.com",
            "Questions": [
                {
                    "_id": "60d74a33b81eae2288e3a7e1",
                    "studentAnswer": "appleAns"
                },
                {
                    "_id": "60d74a33b81eae2288e3a7e2",
                    "studentAnswer": "appleAns2"
                }
            ],
            "Mcqs": [
                {
                    "_id": "60d37ed792868625ec28e99b"
                },
                {
                    "_id": "60d37ed792868625ec28e99c"
                }
            ],
            "__v": 0
        },
        "Questions": {
            "_id": "60d2ebbc9b186320184cc42b",
            "department": "CSE",
            "year_sem": "PUC1",
            "Subject": "CNS",
            "TypeOfExam": "Mid-1",
            "fromTime": "00:34",
            "toTime": "00:34",
            "date": "2020-05-22",
            "email": "shanmukha",
            "Questions": [
                {
                    "_id": "60d2ebbc9b186320184cc42c",
                    "Question": "question1",
                    "Answer": "ans1"
                }
            ],
            "Mcqs": [
                {
                    "_id": "60d2ebbc9b186320184cc42d",
                    "Question": "mcq1",
                    "Option1": "option1",
                    "Option2": "Option 2",
                    "Option3": "Option 3",
                    "Option4": "Option 40",
                    "validOption": "Option 2"
                }
            ],
        }
    });
    const [McqQuestions, setMcqQuestions] = useState([]);

    const _id = location.pathname.split('/')[3];
    const _qid = location.pathname.split('/')[4];
    useEffect(() => {
        seeOutput();
    }, []);

    const seeOutput = () => {
        axios.get(`http://localhost:3001/teacher/studentAnswer/${_id}/${_qid}`).then(res => {
            setQuestions(res.data);
            console.log(res.data);
        })
        console.log(Questions.Answers.Questions);
    }

    return (
        <div>
            {
                Questions.Questions.Questions.map((eachQues, index) => {
                    return (
                        <div key={index}>
                            {Questions.Answers.Questions[index] && Questions.Answers.Questions[index].studentAnswer} <br />
                            {eachQues.Question} <br />
                            {eachQues.Answer}
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Teacher_studentAnswerById;