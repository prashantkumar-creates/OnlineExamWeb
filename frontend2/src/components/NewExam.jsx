import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'


const NnewExam = () => {
    const Department = ["Cse", "Ece", "Mech", "Civil", "Chem", "Metallurgy"];
    const year = ["PUC1", "PUC2", "ENG1", "ENG2", "ENG3", "ENG4"]
    const Subject = ["CNS", "ML", "AI", "CNS", "DM", "P&S"];
    const ExamType = ["Mid-1", "Mid-2", "Mid-3", "SEM-1", "SEM-2", "Assignment", "self-Assesment"];

    const history = useHistory();
    const handleChange = (e) => {
        setExamInfo(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        }
        )
    }

    // let today = new Date().toISOString().slice(0, 10);
    // new Date("<YYYY-mm-dd>")
    useEffect(() => {
        if (!location.state) {
            history.replace("/");
        } else {
            console.log("logged in user: ", location.state.email);
        }
        console.log("logged in usersssss: ", location.state);
    }, []);

    const location = useLocation();
    const [examInfo, setExamInfo] = useState({
        department: "CSE",
        year: "PUC1",
        Subject: "CNS",
        TypeOfExam: "Mid-1",
        fromTime: "12:00",
        toTime: "23:59",
        date: ""
    });

    const test = (e) => {
        e.preventDefault();
        let state = {
            department: examInfo.department,
            year: examInfo.year,
            Subject: examInfo.Subject,
            TypeOfExam: examInfo.TypeOfExam,
            fromTime: examInfo.fromTime,
            toTime: examInfo.toTime,
            date: examInfo.date,
            email: location.state.email,
        }
        history.push("/question", state);
    }

    return (
        <div className="mx-width">
            <form onSubmit={test}>
                <table class="tbl">
                    <tr>
                        <td class="aln-right"><span>Department :</span></td>
                        <td>
                            < select name="department"
                                onChange={handleChange} className="equal-width dropdown-toggle btn btn-secondarys " >
                                {
                                    Department.map((branch, id) => <option value={branch} key={id}>{branch}</option>)
                                }
                            </select >
                        </td>
                    </tr>
                    <tr>
                        <td class="aln-right"><span>Year and sem :</span></td>
                        <td>
                            < select name="year"
                                onChange={handleChange} className="equal-width dropdown-toggle btn btn-secondarys " >
                                {
                                    year.map((branch, id) => <option value={branch} key={id}>{branch}</option>)
                                }
                            </select >
                        </td>
                    </tr>
                    <tr>
                        <td class="aln-right"><span>Subject :</span></td>
                        <td>
                            < select name="Subject"
                                onChange={handleChange} className="equal-width dropdown-toggle btn btn-secondarys " >
                                {
                                    Subject.map((branch, id) => <option value={branch} key={id}>{branch}</option>)
                                }
                            </select >
                        </td>
                    </tr>
                    <tr>
                        <td class="aln-right"><span>Type of exam :</span></td>
                        <td>
                            < select name="TypeOfExam"
                                onChange={handleChange} className="equal-width dropdown-toggle btn btn-secondarys " >
                                {
                                    ExamType.map((branch, id) => <option value={branch} key={id}>{branch}</option>)
                                }
                            </select >
                        </td>
                    </tr>
                    <tr>
                        <td class="aln-right"><span>Start time :</span></td>
                        <td>
                            <input type="time" name="fromTime" id="" onChange={handleChange} required className="equal-width" />
                        </td>
                    </tr>
                    <tr>
                        <td class="aln-right"><span>End time :</span></td>
                        <td>
                            <input type="time" name="toTime" id="" onChange={handleChange} required className="equal-width" />
                        </td>
                    </tr>
                    <tr>
                        <td class="aln-right"><span>Date :</span></td>
                        <td>
                            <input type="date" name="date" id="" onChange={handleChange} required className="equal-width" />
                        </td>
                    </tr>
                    <tr>
                        <td> </td>
                        <td>
                            <input type="submit" value="submit" required className="equal-width submitbtn" />
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}

export default NnewExam;