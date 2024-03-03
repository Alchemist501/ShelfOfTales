const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const viewRouter = require('./routers/viewRouter')
const authRouter = require('./routers/authRouter')
const app = express()
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
console.log(DB);
mongoose.connect(DB, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB connection successful!'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',viewRouter)
app.use('/login',authRouter)
const server = app.listen(8000,()=>{
    console.log("App running on port 3000");
});