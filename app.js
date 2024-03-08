const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const viewRouter = require('./routers/viewRouter');
const authRouter = require('./routers/authRouter');
const app = express()
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
console.log(DB);
try{
  mongoose.connect(DB, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB connection successful!'));
}catch(err){
  console.log(err)
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',viewRouter);
app.use('/api/v1/users',authRouter);
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`App running on port ${port}`);
});