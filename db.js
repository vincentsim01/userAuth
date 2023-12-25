const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/octnode');

mongoose.connect('mongodb://localhost:27017/octnode', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});




// let mongo = require('mongodb');
// let {MongoClient} = require('mongodb');
// let mongoUrl = "mongodb://localhost:27017/octnode";
// let client = new MongoClient(mongoUrl);
// // mongoose.connect(mongoUrl);




// let db = client.db('Restaurant');

// async function postData(colName,data){
//     let output;
//     try{
//         output = await db.collection(colName).insertOne(data);
//     }catch(err){
//         output = {"response":"Error in post data"}
//     }
//     return output
// }

// async function getData(colName,query){
//     let output = [];
//     try{
//         const cursor = db.collection(colName).find(query);
//         for await(const data of cursor){
//             output.push(data)
//         }
//         cursor.closed
//     }catch(err){
//         output.push({"Error":"Error in getting data"})
//     }
//     return output
// }


// module.exports = {

//     getData,
//     postData

// }