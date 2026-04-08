require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connectDB = require('./config/db');
connectDB();

const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes');


app.use('/users',userRoutes);


app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running at Port ${PORT}`);
})