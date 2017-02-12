import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/funcboxDB", () => {
    console.log("Connected")
})


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    title: String,
    desc: String
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


app.post('/addNote/:useremail', (req, res) => {
    const email = req.params.useremail
    console.log(email)
    const { title, desc } = req.body
    console.log(req.body)

    User.updateOne({ email: email }, { title: title, desc: desc }, (err, user) => {
        if (err) {
            console.log(err)
        }

        res.send({ message: "Note added!" })
    })
})

app.get('/getNote/:useremail', (req, res) => {
    const email = req.params.useremail
    console.log('I am used')
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(user)
            res.send(user)
        }


    })
})









app.listen(9002, () => {
    console.log('Start on port 9002')
})