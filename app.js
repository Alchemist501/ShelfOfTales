const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const viewRouter = require('./routers/viewRouter')
const app = express()
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
console.log(DB);
async function connection() {
  try {
    await mongoose.connect(DB);
    console.log('Connected to DB');
  } catch (error) {
    console.error(error);
  }
}
connection();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',viewRouter)
const server = app.listen(3000,()=>{
    console.log("App running on port 3000");
});