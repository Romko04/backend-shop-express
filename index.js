const http = require('http')

const server = http.createServer((req, res)=>{
    console.log("Create first server");
})

server.listen(300,()=>{
    console.log('Create first server');
})