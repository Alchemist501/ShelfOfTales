const express = require('express')
const app = express()
app.use('/',viewRouter)
const server = app.listen(3000,()=>{
    console.log("App running on port 3000\n");
});