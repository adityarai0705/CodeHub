import React, {useState} from 'react'
import "./LoginPage.css"
import image from "./Assets/Logos/CodeTogetherText.png"

export default function LoginPage() {

    const [values, setValues] = useState({ username: "", password: "" });

    const handleSubmit = async (event) => {
        if (handleValidation()) {
            try {
                console.log(values);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleValidation = () => {
        const { password, username } = values;
        if (password === "" || username === "") { console.log("Username and password required"); return false; }
        return true;
    };

    const handleChange = (event) => { setValues({ ...values, [event.target.name]: event.target.value }) };

    return (
        <>
            <div id="loginPageMain1">
                <div id="loginPageMain2">
                    <img id='loginMainPageTitle' src={image} alt="" />
                    <div id='loginForm'>
                        <input id="loginFormUsername" type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} min="3" autoComplete="off" />
                        <input id="loginFormPassword" type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} autoComplete="off" />
                        <button id="loginFormButton" onClick={() => handleSubmit()}>Log In</button>
                    </div>
                </div>
            </div>
        </>
    )
}