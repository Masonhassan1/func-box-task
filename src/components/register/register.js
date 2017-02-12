import React, { useState } from 'react'
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom";

function Register() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const history = useHistory()

    const handleChange = e => {
        const { name, value } = e.target

        setUser(
            {
                ...user,
                [name]: value
            }
        )

    }

    function register() {
        const { name, email, password, reEnterPassword } = user

        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:9002/register", user)
                .then(res => {
                    alert(res.data.message)
                    history.push("/login")
                })

        } else {
            alert('Invalid input')
        }


    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Enter your Name" onChange={handleChange} />
            <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange} />
            <input type="password" name="password" value={user.password} placeholder="Enter your Password" onChange={handleChange} />
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange} />
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push('/login')}>Login</div>
        </div>
    )
}

export default Register