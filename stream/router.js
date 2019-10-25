const {Router} = require('express')
const Chatroom = require('./model')
const Sse = require('json-sse')

const router = new Router()
const stream = new Sse()

router.get('/stream', async (request, response) => {
    console.log("got a request on /stream")
  
    //here I want to start my stream...
    //but I don't have anything to stream.....
    const messages = await Chatroom.findAll()
    const data = JSON.stringify(messages)
    console.log("stringified messages:", data)

    stream.updateInit(data)          // here i put the data in the stream
    stream.init(request, response)   //this is important!!!
    
})

router.post('/message', async (request, response) => {
    console.log("got a request on /message" , request.body)
    const {message} = request.body
    const entity = await Chatroom.create({
        message: message

    })
    const messages = await Chatroom.findAll()  //copied! line +/- 13
    const data = JSON.stringify(messages)      //copied! line +/- 14
    //console.log("stringified messages:", data)
    stream.send(data)                          //Update the stream

    response.status(201)
    response.send("Thanks for your message")
})



module.exports = router