const express = require('express')
const path = require('path')
const viewRouter = require('./routers/viewRouter')
const app = express()
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',viewRouter)
const server = app.listen(3000,()=>{
    console.log("App running on port 3000");
});