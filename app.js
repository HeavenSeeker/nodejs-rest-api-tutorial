//load our app server using express...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))

app.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'gamadev',
        database: 'node_db'
    })

    const userId = req.params.id
    const query = "SELECT * FROM users WHERE id= ?"
    connection.query(query, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for users " + err)
            //send 500 error code back to client
            res.sendStatus(500)
            return
        }

        console.log("Fetched users successfully")

        const users = rows.map((row) => {
            return { firstName: row.first_name, lastName: row.last_name }
        })

        res.json(users)
    })
    //res.end()
})

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOOT")
})

app.get("/users", (req, res) => {
    var user1 = { firstName: "Stephen", lastName: "Curry" }
    const user2 = { firstName: "Stephen", lastName: "Curry" }
    res.json([user1, user2])

    //res.send("Nodemon auto updates when I save this file")
})

app.listen(3003, () => {
    console.log("Server is up and listening on 3003...")
})