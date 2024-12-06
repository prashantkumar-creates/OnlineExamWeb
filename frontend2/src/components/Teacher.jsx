import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import ViewExam from './ViewExam';
import Results from './Results';
import NewExam from './NewExam';

const Teacher = () => {

    const [show, setShow] = useState({
        option1: true,
        option2: false,
        option3: false,
    });

    let selectOne = () => {
        setShow({
            option1: true,
            option2: false,
            option3: false,
        });
    }

    let selectTwo = () => {
        setShow({
            option1: false,
            option2: true,
            option3: false,
        });
    }
    let selectThree = () => {
        setShow({
            option1: false,
            option2: false,
            option3: true,
        });
    }

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (!location.state) {
            history.replace("/");
        } else {
            console.log(location.state.email);
            console.log(location.state.pass);
        }
        console.log(location.state);
    }, []);

    return (
        <div>
            {
                show.option1 &&
                    <div>
                        <div className="d-flex">
                            <div className="sidebar">
                                <div className="menu">Menu</div> <hr />
                                <div><button className="ViewExam btn btn-primarys" onClick={selectOne}>Create a test</button></div>
                                <div><button className="newExam btn btn-darks" onClick={selectTwo}>View Exams</button></div>
                                <div><button className="Results btn btn-darks" onClick={selectThree}>Results</button></div>
                            </div>  
                            <NewExam />
                        </div>
                    </div>
            }
            {
                show.option2 &&
                    <div className="d-flex">
                        <div className="sidebar">
                            <div className="menu">Menu</div> <hr />
                            <div><button className="ViewExam btn btn-darks" onClick={selectOne}>Create a test</button></div>
                            <div><button className="newExam btn btn-primarys" onClick={selectTwo}>View Exams</button></div>
                            <div><button className="Results btn btn-darks" onClick={selectThree}>Results</button></div>
                        </div>
                        <ViewExam />
                    </div>
            }
            {
                show.option3 &&
                    <div className="d-flex">
                        <div className="sidebar">
                            <div className="menu">Menu</div> <hr />
                            <div><button className="ViewExam btn btn-darks" onClick={selectOne}>Create a test</button></div>
                            <div><button className="newExam btn btn-darks" onClick={selectTwo}>View Exams</button></div>
                            <div><button className="Results btn btn-primarys" onClick={selectThree}>Results</button></div>
                        </div>
                        <Results />
                    </div>
            }
        </div>
    )
}

export default Teacher;