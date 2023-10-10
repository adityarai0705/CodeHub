
import React, {useState,useContext} from 'react'

import axios from "axios";
import { loginContext } from '../../loginContext';
import "./LoginPage.css"
import image from "./Assets/Logos/CodeTogetherText.png"
import { useNavigate, useParams } from 'react-router-dom';
import { loginContext } from '../../loginContext';


export default function LoginPage() {
    const navigate = useNavigate()
    const [Message, setMessage] = useState();
    const [LogIn, setLogIn] = useState( "Log In");

    
    //USER-LOGIN INFO
    const {login,setLogin,userCfID,setUserCfID} = useContext(loginContext)

    const [values, setValues] = useState({ cfID: "", password: "" });


    const handleSubmit = async (event) => {
        setLogIn( "Loggin In");
        if (handleValidation()) {
            try {

                    console.log(values);

                    const { password, cfID } = values;
                    
                    const { data } = await axios.post("http://localhost:8000/login", { cfID, password }, { withCredentials: true });
                    if (data.status === false) {
                        console.log(data.msg);
                        setMessage( data.msg);
                    }
                    else if (data.status === true) {
                        console.log(data);
                        localStorage.setItem(process.env.CODETOGETHER_APP_LOCALHOST_KEY, JSON.stringify(data.data));
                        console.log("success");
                        setLogin(true)
                        setUserCfID(cfID)
                        navigate(`/user-home/${values.cfID}`)
                    }

            } catch (error) {
                setMessage("Error : ", error);
            }
        }
    };

    const handleValidation = () => {
        const { password, cfID } = values;
        if (password === "" || cfID === "") { setMessage("cfID and password required"); return false; }
        return true;
    };

    const handleChange = (event) => { setValues({ ...values, [event.target.name]: event.target.value }) };

    return (
        <>
            <div id="loginPageMain1">
                <div id="loginPageMain2">
                    <img id='loginMainPageTitle' src={image} alt="" onClick={()=>navigate("/")}/>
                    <div id='loginForm'>
                        <div style={{color:'darkred'}}>{Message}</div>
                        <input id="loginFormcfID" type="text" placeholder="CodeForces ID" name="cfID" onChange={(e) => handleChange(e)} min="3" autoComplete="off" />
                        <input id="loginFormPassword" type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} autoComplete="off" />
                        <button id="loginFormButton" onClick={() => handleSubmit()}>{LogIn}</button>
                    </div>
                </div>
            </div>
        </>
    )
}