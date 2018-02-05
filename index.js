const express = require('express')
const app = express()
const dirPath = require('path')


app.set('view engine', 'ejs')
app.set('views', dirPath.resolve(__dirname, 'public', 'views'))
app.use(express.static(dirPath.resolve(__dirname, 'public')))

const mongo = require('mongodb').MongoClient
const client = require('socket.io').listen(4000).sockets

//Conect to Mongo
mongo.connect('mongodb://127.0.0.1/denkerdb', (err,db)=>{
    if(err) throw err

    console.log("MongoDb conected...")
    //Conect to socket.io
    client.on('connection', (socket)=>{
        let chat = db.collection('chats')

        //function send Status
        sendStatus = (s)=>{
            socket.emit(s)
        }

        //Get chats from mongo collections
        chat.find().limit(100).sort({_id: 1}).toArray((err,res)=>{
            if(err) throw err

            //emit messages
            socket.emit('output', res)
        })

        //handle input event
        socket.on('input', (data)=>{
            let name = data.name
            let message = data.message

            //check for name and message
            if(name=='' || message=='') {
                sendStatus("Please enter a name and message")
            }else {
                //insert 
                chat.insert({name: name, message: message}, ()=>{
                    client.emit('output', [data])

                    //sent status object
                    sendStatus({
                        message: 'Message sent!',
                        clear: true
                    })
                })
            }

        })
        
        //Handle clear
        socket.on('clear', (data)=>{
            //remove all chats od collection
            chat.remove({}, ()=>{
                //emit cleared
                socket.emit("cleared")
            })
        })
    })
})

app.use((req, res, next)=>{ 
    res.render("index.ejs")
    next()
})

app.listen(3000, ()=>{
    console.log('SERVER RUNNING IN PORT 4000')
})