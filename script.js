//require Mongoose
const mongoose = require("mongoose")
//require person.js from root folder
const Person = require("./person")

dbURI ="mongodb+srv://deji:12345@test1.vkujt.mongodb.net/db1?retryWrites=true&w=majority"

////conect to mongoDB
mongoose.connect(dbURI)
    .then((result)=> console.log("connected to db1"))
    .catch((err)=> console.log(err));

////Create and Save a Record of Person
Person.create({name: "Ayodeji", age: 23, favFoods: ['yam', 'noodles']})
 Person.save((err, data)=>{
        if(err){
         console.log(err);
        } else{
            console.log(data)
        }
    })
 //created an array
const arrayOfPeople = new Array(
    {name: "Ayodeji", age: 23, favFoods: ['yam', 'noodles']},
    {name: "ibk", age: 21, favFoods: ['semo', 'rice']},
    {name: "mike", age: 20, favFoods: ['beans', 'noodles']}
);


//Created Many Records with Person.create()
   Person.create(arrayOfPeople, (err, data) => {
          if(err){
               console.log(err)
          }else{
               console.log(data)
          }
     })

//Used Person.find() to Search Your Database
Person.find({name: 'ibk'}, (err, data)=>{
    if(err){
        console.log('error')
   }else{
        console.log(data)
   }
})

//Used Person.findOne() to Search Your Database and return just one
    Person.findOne({favFoods: {$all: ['yam']}}, (err, data)=>{
        if(err){
            console.log('error')
       }else{
            console.log(data)
       }
    })

//Used Person.findById() to Search Your Database by id
    Person.findById("61d03148ebabea06aa4ff52a", (error, data)  =>{
         if(error){
              console.log(error)
         }else{
              console.log(data);
         }
    })

    //Perform Classic Updates by Running Find, Edit, then Save
        Person.findOne({name: "ibk"}, (err, data)=>{
        if(err){
            console.log('error')
       }else{
            data.favFoods.push("hamburger")
            data.save((err, updated)=>{
                console.log(updated);
            })
            console.log(data);
       }
    })

    //Perform New Updates on a Document Using model.findOneAndUpdate()
    Person.findOneAndUpdate({name: 'Ayodeji'}, {age: 22}, {new: true},(err, data)=>{
        if(err){ 
            console.log(err);
        } else{
            console.log(data);
        }
    })

    //Delete One Document Using model.findByIdAndRemove
    Person.findByIdAndRemove({ _id: "61d06164d9f1594eaf942dbe"}, {new: true}, (err, data)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })

    //Delete Many Documents with model.remove()
    Person.remove({name:'tolu'}, (err, JSONStatus)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(JSONStatus);
        }
    })
//Chain Search Query Helpers to Narrow Search Results
    Person.find({favFoods:{$all:["yam"]}})
        .sort({name: "asc"})
        .limit(2)
        .select({name: true})
        .exec((err, data) => {
        if(!err) {
            console.log(data);
        }
        })