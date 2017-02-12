import React, { useState } from 'react'
import "./login.css"
import axios from 'axios'
import { useHistory } from "react-router-dom";

function Login({ setLoginUser }) {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const history = useHistory()

    function handleChange(event) {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    function login() {
        axios.post("http://localhost:9002/login", user)
            .then(res => {
                alert(res.data.message)
                setLoginUser(res.data.user)
                history.push("/")
            })
    }

    function gotoRegister() {
        history.push('/register')
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" />
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={gotoRegister}>Register</div>
        </div>
    )
}

export default Login