const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./Routes/bookRoutes')

app.use(express.json({limit:'10mb'}));
app.use(cors({
    origin: "http://localhost:8081",
    credentials: true,
}));

app.use('/api/auth',authRoutes);
app.use('/api/books',bookRoutes)


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`✅ App listening on port ${port}`);
    connectDB();
})