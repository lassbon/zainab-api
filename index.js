require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Joi = require('joi')
const port = 6500
const mysql = require('mysql2')
const { v4: uuidv4 } = require('uuid');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

app.use(bodyParser.json())

app.listen(port, () => {
    console.log(` app listening on port ${port}`)
})


app.post('/message', (req, res) => {

    const schema = Joi.object({
        fullname: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        message: Joi.string().min(2).required()
    })

    const { error, value } = schema.validate(req.body)
    
    if (error != undefined) {
        res.status(400).send({
            status: false,
            message: error.details[0].message
        })
    }


    // const fullname = req.body.fullname
    // const email = req.body.email
    // const message = req.body.message

    const { fullname,email, message } = req.body
    const user_id = uuidv4()
    connection.query(
        `INSERT into details(_id,fullname,email,message) values('${user_id}','${fullname}','${email}','${message}')`,
        (err, results, fields) => {
            if (err) {
                console.log("err: " , err)
                res.status(400).send({
                    status: false,
                    message: "Try again please"
                }) 
            }
        }
    )

    res.status(201).send({
        status: true,
        message: "Message successfully sent"
    })
})

