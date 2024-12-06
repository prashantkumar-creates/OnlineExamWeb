import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/styles.css";
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';

function Login() {
    let history = useHistory();
    const [state, setState] = useState({
        email:'',
        pass:''
    });        

    const go = () =>{
        history.replace("/teacher",state);
    }

    const inputChng = (e) =>{
        const {name,value} = e.target;
        console.log(e.target.value);

        setState(prevData => {
            return {
                ...prevData,
                [name]:value
            }
        })
    }
    
    return (
        <div className="bgcolor">
            <div className=" cntx">
                <h2 className="text-center mb-3">LOGIN</h2>
                <form className="row g-3">
                    <div className="col-md-8 offset-2">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" name="email" value={state.email} onChange={inputChng} />
                    </div>
                    <div className="col-md-8 offset-2">
                        <label for="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" name="pass" value={state.pass} onChange={inputChng}/>
                    </div>

                    <div className="col-md-8 offset-4 mt-3">
                        <button type="submit" className="btn btncolor" onClick={go}>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
