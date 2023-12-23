const express = require('express')
const cors = require('cors')
const app = express();
const db = require('./db.js');
const dotenv = require('dotenv');
dotenv.config();
const port = 5001;
const AuthController = require('./controller/authController')
let {postData, getData} = require('./db.js');

app.use(cors());
app.use('/api/auth', AuthController);



app.get('/',(req,res) => {
    res.send("Hiii From Express")
})

// app.post('/usersi',async(req,res) => {
//     let body = req.body;
//     let collection = 'user';
//     let response = await postData(collection,body);
//     res.send(response)
// })

// app.get('/dataku',async(req,res) => {
//     let query = {};
//     let collection = 'restaurants';
//     let response = await getData(collection,query);
//     res.send(response)
// })



app.listen(port,() => {
    console.log(`Running on port ${port}`)
})
