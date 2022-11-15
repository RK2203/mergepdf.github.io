// Create Express Server Backend 

const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {MergePdf}= require('./pdf')

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/template/index.html'))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    let d=await MergePdf(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
    res.redirect(`http://localhost:${port}/static/${d}.pdf`)
})




app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})