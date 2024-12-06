import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

function Answers() {
    const location = useLocation();
    const history = useHistory();

    const [studentMcqAnswer, setstudentMcqAnswer] = useState([]);
    const [studentDescAnswer, setstudentDescAnswer] = useState([]);
    const [TestData, setTestData] = useState({
        "_id": "60fd79ee05b20c1f485c8343",
        "department": "CSE",
        "year_sem": "ENG1",
        "Subject": "AI",
        "TypeOfExam": "Mid-1",
        "fromTime": "23:52",
        "toTime": "23:53",
        "date": "2021-08-01",
        "email": "shanmukha",
        "Questions": [
            {
                "_id": "60fd79ef05b20c1f485c8344",
                "Question": "what is your fav subject"
            }
        ],
        "Mcqs": [
            {
                "_id": "60fd79ef05b20c1f485c8345",
                "Question": "what is your fav game",
                "Option1": "chess",
                "Option2": "kabbadi",
                "Option3": "cricket",
                "Option4": "ludo",
                "validOption": "chess"
            }
        ],
        "__v": 0
    }
    );

    const [DescriptionQurestion, setDescriptionQurestion] = useState([]);
    const [mcqQuestion, setmcqQuestion] = useState([]);

    const [countdownDate, setcountdownDate] = useState(new Date(TestData.date + ' ' + TestData.fromTime).getTime());
    const [countdownDate2, setcountdownDate2] = useState(new Date(TestData.date + ' ' + TestData.fromTime).getTime());

    const [timerDays, setTimerDays] = useState("01");
    const [timerHours, setTimerHours] = useState("01");
    const [timerMinutes, setTimerMinutes] = useState("01");
    const [timerSeconds, setTimerSeconds] = useState("10");

    const [testNotStarted, setTestNotStarted] = useState(true);
    const [testEnded, settestEnded] = useState(false)

    let interval = useRef();
    let y = useRef();

    useEffect(() => {
        getQuestionsFromDb();
    }, []);

    const getQuestionsFromDb = () => {
        axios.get(`http://localhost:3001/question/${location.state._id}`).then(
            res => {
                setDescriptionQurestion(res.data.Questions);
                setmcqQuestion(res.data.Mcqs);

                console.log(res.data);
                setTestData(res.data);

                setcountdownDate(new Date(res.data.date + ' ' + res.data.fromTime).getTime());
                setcountdownDate2(new Date(res.data.date + ' ' + res.data.toTime).getTime());
                
                let arr = Array.from({ length: res.data.Questions.length }, () => ({ studentAnswer: '' }))
                let arr2 = Array.from({ length: res.data.Mcqs.length }, () => ({ studentAnswer: '' }))
                setstudentDescAnswer(arr);
                setstudentMcqAnswer(arr2);
                return res.data;
            }
        ).then((res) => {
            setcountdownDate(new Date(res.date + ' ' + res.fromTime).getTime());
            setcountdownDate2(new Date(res.date + ' ' + res.toTime).getTime());
            return res;
        }).then((res) => {
            console.log("res "+countdownDate);
            console.log("res "+countdownDate2);
            console.log(res);
            var i = interval.current;
            var j = y.current;
            startTimer(res);
            return () => {
                clearInterval(i);
                clearInterval(j);
            }
        }).catch(err => console.log(err));
    }

    const startTimer = (res) => {
        interval = window.setInterval(() => {
            // setTestData(res)
            console.log("shanmukha " + TestData.date);
            console.log("countDown" + new Date(countdownDate).toString());
            if (new Date("2021-08-01 23:52").getTime() != countdownDate) {
                const now = new Date().getTime();
                const distance = countdownDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (distance <= 0) {
                    clearInterval(interval.current);
                    var y = setInterval(function () {
                        setTestNotStarted(false);
                        var now = new Date().getTime();
                        var distance = countdownDate2 - now;
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        setTimerDays(days);
                        setTimerHours(hours);
                        setTimerMinutes(minutes);
                        setTimerSeconds(seconds);
                        console.log("if");
                        console.log("days " + days + " " + hours + " " + minutes + " " + seconds);
                        console.log(distance);
                        console.log(distance < 1000);
                        if (distance < 0) {
                            clearInterval(y);
                            settestEnded(true);
                        }
                    }, 1000);
                }
                else {
                    setTimerDays(days);
                    setTimerHours(hours);
                    setTimerMinutes(minutes);
                    setTimerSeconds(seconds);
                    console.log("else");
                    console.log("days " + days + " " + hours + " " + minutes + " " + seconds);
                }
            }
            else {
                console.log(res);
                setcountdownDate(new Date(res.date + ' ' + res.fromTime).getTime());
                setcountdownDate2(new Date(res.date + ' ' + res.toTime).getTime());
                console.log("else shanm " + new Date(countdownDate).toLocaleString());
                console.log("else shanm " + new Date(countdownDate2).toLocaleString());
                console.log("else shanmukh" + new Date(res.date + ' ' + res.fromTime).toLocaleString());
                console.log("final " + new Date("2021-08-01 23:52").getTime());
                console.log("final2 " + countdownDate);
                console.log("final " + new Date("2021-08-01 23:52").getTime() != countdownDate);
            }
        }, 1000);
        
    }


    return (
        <div>
            <h2>{countdownDate}</h2>
            <h2>{countdownDate2}</h2>

            <h2>{new Date(countdownDate).toLocaleString()}</h2>
            <h2>{new Date(countdownDate2).toLocaleString()}</h2>

            {
                TestData && <div>
                    <h5>{TestData.date + ' ' + TestData.fromTime}</h5>
                    <h5>{TestData.date + ' ' + TestData.toTime}</h5>
                </div>
            }
            {
                testEnded
                    ?
                    <h1>Test Ended</h1>
                    : <form >
                        {
                            mcqQuestion.map((question, i) => {
                                return (
                                    <div key={i}>
                                        <h6>{question.Question}</h6>
                                        <input className="form-check-input" type="radio" name="studentAnswer" value={question.Option1} id={question.Option1} />
                                        <label className="form-check-label" htmlFor={question.Option1}> {question.Option1}</label> <br />
                                        <input className="form-check-input" type="radio" name="studentAnswer" value={question.Option2} id={question.Option2} />
                                        <label className="form-check-label" htmlFor={question.Option2}> {question.Option2}</label> <br />
                                        <input className="form-check-input" type="radio" name="studentAnswer" value={question.Option3} id={question.Option3} />
                                        <label className="form-check-label" htmlFor={question.Option3}> {question.Option3}</label> <br />
                                        <input className="form-check-input" type="radio" name="studentAnswer" value={question.Option4} id={question.Option4} />
                                        <label className="form-check-label" htmlFor={question.Option4}> {question.Option4}</label> <br />
                                        <hr />
                                    </div>
                                )
                            })
                        }
                        {
                            DescriptionQurestion.map((x1, i) => {
                                return (
                                    <div key={i}>
                                        <h5>{x1.Question} </h5>
                                        <input type="text" name="studentAnswer" /> <br />
                                    </div>
                                );
                            })
                        }
                        <input type="submit" />
                    </form>
            }

        </div>
    )
}

export default Answers