let socket = io()

socket.on('connect', ()=>{
    console.log(`Conected with server`);
})

socket.on('changeData', function(change){
    console.log(change)
})