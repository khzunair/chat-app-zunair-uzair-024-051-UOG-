const express = require('express');
require("dotenv").config();

const app = express();


  
  const swaggerSpec = swaggerJSDoc(options);

// Connect Database
connectDB();


app.use(express.json({ extended: false }))

// for Production
const path = require('path')



app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/connect', require('./routes/api/addRequest'));


const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port 50000`));