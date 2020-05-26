var express = require('express')
var serveStatic = require('serve-static')
var app = express()
app.use(express.static('build'));
const port = 80;
app.listen(port)
console.log(`Server is running on port: ${port}!`);