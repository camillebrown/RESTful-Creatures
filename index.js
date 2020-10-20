const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts');
//core module: FILE SYSTEM (allows us to do CRUD actions on text files)
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
//body-parser middleware
//The express.urlencoded() middleware tells body-parser to capture urlencoded data (form data) and store it in req.body
//The {extended: false} option ensures that the values in this body will either be strings or arrays
app.use(express.urlencoded({extended: false}))

app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

app.get('/', (req, res)=>{
    res.render('home.ejs')
})


app.listen(8000,()=>{
    console.log('the 8000 port is on')
})