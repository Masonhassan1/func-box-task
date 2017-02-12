import React from "react"
import "./showkeeper.css"
import axios from "axios"

const ShowKeeper = ({ keeperList, setKeeperList, email }) => {

    const deleteKeeper = (id) => {
        console.log(keeperList)
        axios.post(`http://localhost:9002/api/delete/${email}`, { id })
            .then(res => setKeeperList(res.data))
    }


    return (
        <div className="showKeeper row">
            {
                keeperList.map(keeper => (
                    <div className="keeperCard col-md-3" key={keeper._id}>
                        <h1 className="title">
                            {keeper.title}
                            <i className="deleteIcon fa fa-trash" aria-hidden="true" onClick={() => deleteKeeper(keeper._id)} ></i>
                        </h1>
                        <textarea
                            className="descriptionBox"
                            value={keeper.description}
                            readOnly />
                    </div>
                ))
            }
        </div>
    )
}

export default ShowKeeper