const mongoose = require("mongoose")
 //Create a person prototype
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    age: Number,
    favFoods: [String]
})

const Person =  mongoose.model("Person", personSchema);
module.exports= Person; 
