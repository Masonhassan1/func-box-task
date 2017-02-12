import React, { useState, useEffect } from 'react'
import "./homepage.css"
import axios from "axios"
import AddKeeper from '../addKeeper/addKeeper'
import ShowKeeper from '../showkeeper/showKeeper'



function Homepage({ setLoginUser, user }) {

    const [keeperList, setKeeperList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:9002/api/getAll/${user.email}`)
            .then(res => setKeeperList(res.data))
    }, [keeperList])

    const [note, setNote] = useState({
        title: "",
        desc: "",
    })



    function handleClick() {
        setLoginUser({})
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

            <AddKeeper keeperList={keeperList} setKeeperList={setKeeperList} email={user.email} />
            <ShowKeeper keeperList={keeperList} setKeeperList={setKeeperList} email={user.email} />
            <div className="button" onClick={handleClick}>Logout</div>
        </div>
    )
}

export default Homepage