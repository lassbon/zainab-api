const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Joi = require('joi')
const port = 6500


app.use(bodyParser.json())

app.listen(port, () => {
    console.log(` app listening on port ${port}`)
})


app.post('/customer', (req, res) => {

    const schema = Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        phone: Joi.string().min(11).max(15).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })

    const { error, value } = schema.validate(req.body)
    
    if (error != undefined) {
        res.status(400).send({
            status: false,
            message: error.details[0].message
        })
    }


    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const phone_number = req.body.phone
    const email = req.body.email

    // if (firstname == "" || lastname == "" || phone_number == "" || email == "") {
    //     res.status(400).send({
    //         status: false,
    //         message: "All fields are mandatory"
    //     })
    // }

    //do some database insert of the data
    res.send({
        status: true,
        message: "customer successfully created"
    })
})

app.get('/customer', (req, res) => {
    

    res.status(200).send({
        status: true,
        message: "All data fetched"
    })

})

app.patch('/customer', (req, res) => {
    

    res.status(200).send({
        status: true,
        message: "Data successfully updated"
    })

})

app.delete('/customer', (req, res) => {
    

    res.status(200).send({
        status: true,
        message: "Data successfully deleted"
    })

})