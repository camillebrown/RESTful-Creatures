const express = require('express')
const router = express.Router()
const fs = require('fs')

// -----------> PHC index route <-----------
router.get('/', (req, res)=>{
    //this reads the dinosaurs JSON file as a text file
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    //this converts the text (string) into a JS 'object' we can grab data from
    let phcData = JSON.parse(prehistoric_creatures)
    res.render('./prehistoric_creatures/index.ejs', {prehistoric_creatures: phcData})
})

// -----------> PHC post route <-----------
router.post('/', (req, res)=>{
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
router.get('/new', (req, res)=>{
    res.render('./prehistoric_creatures/new.ejs')
})

// ----------> PHC show route <-----------
router.get('/:idx', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(prehistoric_creatures)
    //get array index from url parameter
    let phcIndex = req.params.idx
    res.render('./prehistoric_creatures/show.ejs', {creature: phcData[phcIndex], phcId: phcIndex})
})

module.exports = router;