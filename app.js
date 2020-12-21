const express = require('express');
const app = express();


const chat1 = [
    {
        message: "Some text",
        date: '1608138141315',
        id: '1',
        owner: 'rt75hjut56y74'
    },
    {
        message: "Some text 2",
        date: '1608138161315',
        id: '2',
        owner: 0
    },
    {
        message: "Some text sample",
        date: '',
        id: '3',
        owner: 'rt75hjut56y74'
    },
    {
        message: "Some text 4",
        date: '',
        id: '4',
        owner: 0
    },
    {
        message: "Some text 5",
        date: '',
        id: '5',
        owner: 0
    },

];
const chat2 = [
    {
        message: "123 Some text",
        date: '',
        id: '1',
        owner: 'rt75hjut56y74'
    },
    {
        message: "123 Some text 2",
        date: '',
        id: '2',
        owner: 0
    },
    {
        message: "123 Some text sample",
        date: '',
        id: '3',
        owner: 'rt75hjut56y74'
    },
    {
        message: "Some text 4",
        date: '',
        id: '4',
        owner: 0
    },
    {
        message: "Some text 5",
        date: '',
        id: '5',
        owner: 0
    },

];
const chatRooms = [
    {
        chat: chat1,
        id: 'fdsfasgasdf6758567867gh',
        name: "John Doe"

    },
    {
        chat: chat2,
        id: 'fd785685asdfghlhjklghkj',
        name: "Jane Doe"
        
    }
]

app.use(express.static('dist'));

app.get('/', function(req, res){
    // db.query()
    res.sendFile('dist/index.html', {root: __dirname});
})

app.get('/chats', function(req, res) {
    res.json(chatRooms);
})

const server = app.listen(4000, function() {
    console.log('sucess');
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(socket.io);

    socket.on('message', (data) => {
        console.log('------ ', data);
        socket.broadcast.emit('message_sent', data);

    })


})