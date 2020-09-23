var express = require('express')
var app = express()
app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views', './views')

var server = require('http').Server(app)
var io = require('socket.io')(server)
server.listen(3000)
var arr = []
io.on('connection', function (socket) {
    socket.on('client-send-Username', data => {
        if (data == '') {
            socket.emit('Server-send-error', 'Cần nhập username')
        }
        else {
            var find = arr.find(item => item.data == data)
            if (find !== undefined) {
                socket.emit('Server-send-error', 'Đăng nhập thất bại do trùng username')
            }
            else {
                var obj = {
                    id: socket.id,
                    data: data
                }
                arr.push(obj)
                socket.Username = data;
                socket.emit('Server-send-success', data)
                io.sockets.emit('Server-send-array-user', arr)
            }
        }
    })
    socket.on('logout', () => {
        arr.splice(arr.findIndex(x => x.id == socket.id), 1)
        io.sockets.emit('Server-send-array-user', arr)
    })
    socket.on('client-send-message', data => {
        socket.broadcast.emit('Server-send-message-others', { un: socket.Username, ms: data })
        socket.emit('Server-send-message', { un: socket.Username, ms: data })
    })
    socket.on('disconnect', function () {
        if (arr.findIndex(x => x.id == socket.id) !== -1) {
            arr.splice(arr.findIndex(x => x.id == socket.id), 1)
        }
        io.sockets.emit('Server-send-array-user', arr)

    })
    socket.on('Typing', (data) => {
        socket.broadcast.emit('Server-send-Typing',socket.Username)
    })
    socket.on('stopTyping', (data) => {
        socket.broadcast.emit('Server-send-stopTyping',socket.Username)
    })
    // socket.on('client-send-ID', (id) => {
    //     io.to(id).emit()
    // })
})

app.get('/', function (req, res) {
    res.render('home')
})