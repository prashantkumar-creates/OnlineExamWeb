import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from "axios";

function EachAnswer() {

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (!location.state) {
            history.replace("/");
        } else {
            console.log("logged in user: ", location.state.email);
        }
    }, []);

    const [inputList, setInputList] = useState([{ Question: "", Answer: "" }]);
    const [Mcqs, setMcqs] = useState([]);

    const submitQuestion = (e) => {
        e.preventDefault();
        let state = {
            department: location.state.department,
            year_sem: location.state.year_sem,
            Subject: location.state.Subject,
            TypeOfExam: location.state.TypeOfExam,
            fromTime: location.state.fromTime,
            toTime: location.state.toTime,
            date: location.state.date,
            email: location.state.email,
            Questions: inputList,
            Mcqs: Mcqs
        }
        console.log(state);
        axios.post("http://localhost:3001/question", state).then(
            res =>{
                console.log(res);
                history.goBack();
            }
        ).catch(err => console.log(err));
        console.log(state);
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const optionEntered = (e, index) => {
        const { name, value } = e.target;
        const list = [...Mcqs];
        list[index][name] = value;
        setMcqs(list);
        console.log(list);
    }

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleRemoveMcq = index => {
        const list = [...Mcqs];
        list.splice(index, 1);
        setMcqs(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { Question: "", Answer: "" }]);
    };

    const handleAddMcq = () => {
        setMcqs([...Mcqs, { Question: "", Option1: "", Option2: "", Option3: "", Option4: "", validOption: 1 }]);
    };

    const [Questions, setQuestions] = useState({
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
    });

    const [Answers, setAnswers] = useState({
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
    });

    useEffect(() => {
        getAnswerId();
    }, [])

    const getAnswerId = () => {
        axios.get(`http://localhost:3001/teacher/studentAnswer/${location.state.state.questionId}/${location.state.state.answerId}`)
            .then(res => {
                console.log(res.data)
                setQuestions(res.data.Questions)
                setAnswers(res.data.Answers)
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="smain">
                <h4>MCQ'S</h4>
                {Questions.Mcqs.map((questionItem, index) => {
                    return (
                        <div key={index} className="sbox">
                            <div className="qnumber">Question{index + 1} :  {questionItem.Question} </div>
                            <div className="ans"> Your Ans: {Answers.Mcqs[index].studentAnswer}</div>
                        </div>
                    )
                })}
            </div>
            <div className="smain">
                <h4>Descriptive Questions</h4>
                {Questions.Questions.map((questionItem, index) => {
                    return (
                        <div key={index} className="sbox">
                            <div className="qnumber">Question{index + 1} :  {questionItem.Question} </div>
                            { Answers.Questions[index] ? <div className="ans"> Your Ans: {Answers.Questions[index].studentAnswer}</div> : <div className="ans"> Not Answered </div>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EachAnswer
