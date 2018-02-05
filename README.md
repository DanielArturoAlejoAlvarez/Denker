# DENKER
## Description

This repository serves as a fullstack purely develop application in JavaScript, created with Nodejs, Express, MongoDB and web Sockets. He also added Bootstrap and Jquery to the design.

## Installation

Install packages:
```html
$ npm install
```

## Usage
```html
$ git clone https://github.com/DanielArturoAlejoAlvarez/Denker.git [NAME APP]
```
Follow the following steps and you're good to go! Important:


Start server to our API (includes auto refreshing):

```html
$ cd [NAME APP]
$ npm start
```


![alt text](https://media.giphy.com/media/rQ7PlVrT8GftK/giphy.gif)

## Coding

### Model

```javascript

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

})

...
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/DanielArturoAlejoAlvarez/Denker. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

