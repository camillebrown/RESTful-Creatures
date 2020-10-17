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

app.get('/', (req, res)=>{
    res.render('home.ejs')
})

// -----------> DINO index route <-----------
app.get('/dinosaurs', (req, res)=>{
    //this reads the dinosaurs JSON file as a text file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    //this converts the text (string) into a JS 'object' we can grab data from
    let dinoData = JSON.parse(dinosaurs)
    //handle a query string if there is one
    let nameFilter = req.query.nameFilter
    console.log(nameFilter)
    if(nameFilter){ // if nameFilter is not undefined do the below
        //reassign the dinoData array to a new array of only the dino names that match what was input
        dinoData = dinoData.filter(dino=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }


    res.render('./dinosaurs/index.ejs', {dinosaurs: dinoData})
})

// -----------> DINO post route <-----------
app.post('/dinosaurs', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body) // push the new dino to the array

    //write the newly updated dinoData array back to the dinosaurs.json file
    //.stringify turns it back to text
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    //redirect to the GET /dinosaurs route (index) after the data has been submitted and stored back in the JSON file
    res.redirect('/dinosaurs')
})

// -----------> DINO new route <-----------
app.get('/dinosaurs/new', (req, res)=>{
    res.render('./dinosaurs/new.ejs')
})

// ----------> DINO show route <-----------
app.get('/dinosaurs/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //get array index from url parameter
    let dinoIndex = req.params.idx
    res.render('./dinosaurs/show.ejs', {dino: dinoData[dinoIndex], dinoId: dinoIndex})
})

// -----------> PHC index route <-----------
app.get('/prehistoric_creatures', (req, res)=>{
    //this reads the dinosaurs JSON file as a text file
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    //this converts the text (string) into a JS 'object' we can grab data from
    let phcData = JSON.parse(prehistoric_creatures)
    res.render('./prehistoric_creatures/index.ejs', {prehistoric_creatures: phcData})
})

// -----------> PHC post route <-----------
app.post('/prehistoric_creatures', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(prehistoric_creatures)
    phcData.push(req.body) // push the new dino to the array

    //write the newly updated dinoData array back to the dinosaurs.json file
    //.stringify turns it back to text
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(phcData))

    //redirect to the GET /dinosaurs route (index) after the data has been submitted and stored back in the JSON file
    res.redirect('/prehistoric_creatures')
})

// -----------> PHC new route <-----------
app.get('/prehistoric_creatures/new', (req, res)=>{
    res.render('./prehistoric_creatures/new.ejs')
})

// ----------> PHC show route <-----------
app.get('/prehistoric_creatures/:idx', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(prehistoric_creatures)
    //get array index from url parameter
    let phcIndex = req.params.idx
    res.render('./prehistoric_creatures/show.ejs', {creature: phcData[phcIndex], phcId: phcIndex})
})

// ----------> PHC edit route <-----------
app.get('/prehistoric_creatures/edit/:idx', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(prehistoric_creatures)
    //get array index from url parameter
    let phcIndex = req.params.idx
    phcData.splice(phcIndex, 1, req.body)
    console.log(req.body)
    // console.log(phcData)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(phcData))
    // res.redirect('/prehistoric_creatures')
    res.render('./prehistoric_creatures/edit.ejs', {creature: phcData[phcIndex], phcId: phcIndex})
})


app.listen(8000,()=>{
    console.log('the 8000 port is on')
})