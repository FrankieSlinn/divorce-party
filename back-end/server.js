// Essential NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT|| 5000;

//Middleware
app.use(express.json())

app.listen(port, () => console.log(`Server started on port ${port}`))
