// server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const serverRoutes = require('./routes/serverRoutes');

// ... (rest of the code remains the same)

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

app.use((req,res,next) =>{
    // Get the current date and time
    const now = new Date();
    
    console.log("Request timestamp: ",now.toLocaleString())
    console.log(req.path,req.method,req.body)
    next()
})

// Mount routes
app.use('/api/projects', projectRoutes);
app.use('/status',serverRoutes);

mongoose.connect(process.env.MONG_URI)
    .then(() =>{
        app.listen(process.env.PORT, () =>{
            console.log("Server listening on port ",process.env.PORT)
        })
    })
    .catch((error) =>{
        console.log(error.message)
    })