const socketIO = require('socket.io')
const io = socketIO

//enter modal

const cs = inventoryDB.watch()

cs.on('change', (change)=>{
    console.log(change)
    io.emit('changeData', change)
})

io.on('connection', ()=>{
    console.log('connected')
})

let socket = io
module.exports = socket