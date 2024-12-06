import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea';
import axios from "axios";

function EachQuestion() {

    const location = useLocation();
    const history = useHistory();
    const [inputList, setInputList] = useState([{ Question: "", Answer: "" }]);
    const [Mcqs, setMcqs] = useState([]);

    const [details, setdetails] = useState(
        {
            "Questions": [
            ],
            "Mcqs": [
            ],
            "__v": 0
        })

    useEffect(() => {
        getQuestionDetails();
    }, []);

    const getQuestionDetails = () => {
        const _id = location.pathname.split('/')[3];
        if (!location.state) {
            history.replace("/");
        } else {
            console.log(location.state.email);
            console.log(location.state.pass);
        }
        axios.get(`http://localhost:3001/question/${_id}`).then(res => {
            console.log(res.data);
            setdetails(res.data);
            setInputList(res.data.Questions);
            setMcqs(res.data.Mcqs);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        if (!location.state) {
            history.replace("/");
        } else {
            console.log("logged in user: ", location.state.email);
        }
    }, []);

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
        const _id = location.pathname.split('/')[3];
        axios.patch(`http://localhost:3001/question/${_id}`, state).then(
            res => {
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

    return (
        <div>
            <div className="floatRight">
                <button onClick={handleAddClick}>Add Questions </button>
                <button onClick={handleAddMcq}>Add Mcqs</button>
            </div>
            <form onSubmit={submitQuestion} className="question">
                <div className="cbox">
                {inputList.map((x, i) => {
                    return (
                        <div key={i}>
                            <h5>Question {i + 1}</h5>
                            <TextareaAutosize
                                className="autoresizing"
                                required
                                name="Question"
                                placeholder="Enter Question"
                                value={x.Question}
                                onChange={e => handleInputChange(e, i)}
                            />
                            <br />
                            {/* <TextareaAutosize
                                required
                                className="ml10"
                                className="autoresizing"
                                name="Answer"
                                placeholder="Enter Answer"
                                value={x.Answer}
                                onChange={e => handleInputChange(e, i)}
                            /> */}
                            <div >
                                {inputList.length !== 1 && <button
                                    className="btn submitbtn"
                                    onClick={() => handleRemoveClick(i)}>Remove {i} </button>}
                            </div>
                            <br />
                        </div>
                    );
                })}
                </div>
                <div className="cbox">
                {Mcqs.map((x, i) => {
                    return (
                        <div key={i}>
                            <h5>Question {i + 1}</h5>
                            <div>
                                <TextareaAutosize required type="text" name="Question" value={x.Question} onChange={e => optionEntered(e, i)} className="autoresizing" placeholder="Enter question" />
                                <br />
                                <input required type="text" name="Option1" value={x.Option1} onChange={e => optionEntered(e, i)} placeholder="Option1" /> <br />
                                <input required type="text" name="Option2" value={x.Option2} onChange={e => optionEntered(e, i)} placeholder="Option2" /> <br />
                                <input required type="text" name="Option3" value={x.Option3} onChange={e => optionEntered(e, i)} placeholder="Option3" /> <br />
                                <input required type="text" name="Option4" value={x.Option4} onChange={e => optionEntered(e, i)} placeholder="Option4" /> <br />
                                <select name="validOption" onChange={e => optionEntered(e, i)} required>
                                    <option value="" disabled selected>Select your option</option>
                                    <option value={x.Option1}>{x.Option1}</option>
                                    <option value={x.Option2}>{x.Option2}</option>
                                    <option value={x.Option3}>{x.Option3}</option>
                                    <option value={x.Option4}>{x.Option4}</option>
                                </select>
                            </div>
                            <div >
                                {Mcqs.length !== 0 && <button
                                    className="btn submitbtn"
                                    onClick={() => handleRemoveMcq(i)}>Remove {i} </button>}
                            </div>
                            <br />
                        </div>
                    );
                })}
                </div>

                <input type="submit" value="Update Test" className="btn submitbtn"/>
            </form>
            <div style={{ marginTop: 20 }}> <pre> {JSON.stringify(inputList, "\t", 2)} </pre> </div>
            <div style={{ marginTop: 20 }}> <pre> {JSON.stringify(Mcqs, "\t", 2)} </pre> </div>
        </div>
    )
}

export default EachQuestion;