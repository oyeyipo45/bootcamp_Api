const express = require('express')
const dotenv = require('dotenv')
const morgan = require ('morgan')


//Route Files

const bootcamps = require('./routes/bootcamps')
const logger = require('./middleware/logger')

//load env vars
dotenv.config({path: './config/config.env'})

const app = express()



//middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5005


app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))