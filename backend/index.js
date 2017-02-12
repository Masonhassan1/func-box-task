import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb+srv://admin-akshay:Test123@cluster0.icp4w.mongodb.net/funcboxDB', { useNewUrlParser: true, useUnifiedTopology: true });

const keeperSchema = new mongoose.Schema({
    title: String,
    description: String
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    notes: [keeperSchema]
})



const User = new mongoose.model("User", userSchema)

//routes

app.post('/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body

    User.findOne({ email: email }, (err, userfound) => {
        if (userfound) {
            res.send({ message: "User already registered" })
        } else {
            const user = new User({
                name: name,
                email: email,
                password: password,
                title: "",
                desc: ""
            })

            user.save(error => {
                if (error) {
                    res.send(error)
                } else {
                    res.send({ message: "Successfully Registered! Please Login :)" })
                }
            })
        }
    })


})



app.get("/api/getAll/:useremail", (req, res) => {
    const email = req.params.useremail

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(user.notes)
        }
    })
})

app.post("/api/addNew/:useremail", (req, res) => {
    const email = req.params.useremail
    const { title, description } = req.body

    const keeperObj = {
        title: title,
        description: description
    }



    User.findOneAndUpdate({ email: email },
        { $push: { notes: keeperObj } },
        function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Sth is wrong. Not adding to the notes")
            }
        }
    )


})

app.post("/api/delete/:useremail", (req, res) => {
    const { id } = req.body
    const email = req.params.useremail
    console.log(id, email)

    User.updateOne({ email: email },
        { $pull: { notes: { _id: id } } },
        function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Sth is wrong. Not deleting note")
            }
        }
    )

})



let port = process.env.PORT;
if (port == null || port == "") {
    port = 9002;
}




app.listen(port, () => {
    console.log('Working,,,')
})