const express = require('express')
const socket = require('socket.io')
const http = require('http')
const fs = require('fs')

const PORT = 8080

const app = express()
const server = http.createServer(app)

const io = socket(server)

let userNum = 0

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/', (req, res) => {
    console.log('user connection!')
    fs.readFile('./static/index.html', (err, data) => {
        if (err) {
            res.send('ERROR')
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        }
    })
})

io.sockets.on('connection', (socket) => {

    socket.on('newUser', () => {
        console.log(userNum++, 'connection')
        socket.name = userNum
        io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: userNum + ' connection'})
    })

    socket.on('message', (data) => {
        console.log(data)
        data.name = socket.name
        socket.broadcast.emit('update', data);
    })

    socket.on('disconnect', () => {
        console.log(socket.name + 'discommection')
        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + ' disconnection'})
    })
})


server.listen(PORT, () => {
    console.log('Server running at ', PORT)
})