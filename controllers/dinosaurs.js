const express = require('express')
const router = express.Router()
const fs = require('fs')

// ----> DINO INDEX ROUTE <------
router.get('/', (req, res)=>{
    // take the text from dinosaurs.json and store it in a variable
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) // convert the string to an array
    
    // handle a query string if there is one
    let nameFilter = req.query.nameFilter
    if(nameFilter){ // reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
        dinoData = dinoData.filter(dino=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    
    res.render('./dinosaurs/index.ejs', {dinosaurs: dinoData})
})

// ----> DINO NEW ROUTE <------
router.get('/new', (req, res)=>{
    res.render('./dinosaurs/new.ejs')
})

// ----> DINO SHOW ROUTE <------
router.get('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // get array index from url parameter
    let dinoIndex = req.params.idx
    console.log(dinoData[dinoIndex])
    res.render('./dinosaurs/show.ejs', {dino: dinoData[dinoIndex], dinoId: dinoIndex})
})

// ----> DINO POST ROUTE <------
router.post('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body) // push the new dino to the array
    // save the new dinoData array to the dinosaurs.json file
    // JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to the GET /dinosaurs route (index)
    res.redirect('/')
})

module.exports = router;
