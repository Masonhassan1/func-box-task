import React, { useState, useEffect } from 'react'
import "./homepage.css"
import axios from "axios"


function Homepage({ setLoginUser, user }) {


    const [note, setNote] = useState({
        title: "",
        desc: "",
    })



    function handleClick() {
        setLoginUser({})
    }


    function addNote() {

        axios.post(`http://localhost:9002/addNote/${user.email}`, note)
            .then(res => alert(res.data.message))

    }

    function handleChange(e) {
        const { name, value } = e.target

        setNote(
            {
                ...note,
                [name]: value
            }
        )
    }

    return (
        <div className="homepage">
            <h1>Hello {user.name}</h1>

            <input type="text" name="title" value={note.title} placeholder="Enter title" onChange={handleChange} />
            <input type="text" name="desc" value={note.description} placeholder="Enter description" onChange={handleChange} />


            <div className="button" onClick={addNote}>Add Note</div>
            <div className="button" onClick={handleClick}>Logout</div>
        </div>
    )
}

export default Homepage