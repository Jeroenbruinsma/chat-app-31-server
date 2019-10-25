const express = require('express')
const bodyParser = require('body-parser')
const streamRouter =  require('./stream/router')
const userRouter = require('./user/router')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

const jsonParser = bodyParser.json()
app.use(    cors()  )  //cors function is EXECUTED ()
app.use(jsonParser)
app.listen(port, () => console.log("Server running on port ", port))

app.get('/', (request, response) => {
    console.log("get an request on /")
    response.status(200)
    response.send("hello world!")
})

app.use(streamRouter)
app.use(userRouter)

