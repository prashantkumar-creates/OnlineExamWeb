import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

function Question() {

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (!location.state) {
            history.replace("/");
        } else {
            console.log("logged in user: ", location.state.email);
        }
    }, []);


    const [question, setQuestion] = useState({
        q1: "",
        q2: "",
        q3: "",
        q4: ""
    });

    const questionChanged = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setQuestion(prevQues => {
            return {
                ...prevQues,
                [e.target.name]: e.target.value
            }
        });
    }

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
            q1: question.q1,
            q2: question.q2,
            q3: question.q3,
            q4: question.q4
        }

        history.goBack();
        console.log(state);
    }

    const goback = () => {
        history.goBack();
    }

    return (
        <div>
            <nav className="navbar sticky-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand" onClick={goback} >Home</div>
                </div>
            </nav>
            <form onSubmit={submitQuestion} className="question">
                
                <textarea className="form-control" id="textAreaExample1" rows="15" name="q1" onChange={questionChanged} value={question.q1} placeholder="Enter Question 1" />
                <textarea className="form-control" id="textAreaExample2" rows="15" name="q2" onChange={questionChanged} value={question.q2} placeholder="Enter Question 2" />
                <textarea className="form-control" id="textAreaExample3" rows="15" name="q3" onChange={questionChanged} value={question.q3} placeholder="Enter Question 3" />
                <textarea className="form-control" id="textAreaExample4" rows="15" name="q4" onChange={questionChanged} value={question.q4} placeholder="Enter Question 4" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Question