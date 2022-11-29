require("dotenv").config()
const express = require("express")
const methodOverride = require("method-override")
const app = express()
const PORT = 3000
const Fruit = require("./models/fruits")
const reactViews = require('express-react-views')
const mongoose = require("mongoose")

// console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', ()=> {
  console.log('connected to mongo')
})

app.set("view engine", "jsx")
app.engine("jsx", reactViews.createEngine())

app.use((req, res, next) => {
  console.log("Im running for all routes")
  console.log("1. middleware")
  next()
})

app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))


// INDEX
app.get("/fruits", (req, res) => {
  // console.log("2. controller")
  Fruit.find({}, (error, allFruits) => {
    if(!error) {
      res.status(200).render("Index", {fruits: allFruits})
    }
    else {
      res.status(400).render(error)
    }
  }
  )

  // res.render("Index", {fruits: fruits})
})

// NEW
app.get("/fruits/new", (req, res) => {
  console.log("2. controller")
  res.render("New")
})

//DELETE
app.delete("/fruits/:id", (req, res) => {
  Fruit.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect("/fruits")
  })
})


// UPDATE
// app.put('/fruits/:id', (req, res)=>{
//   if(req.body.readyToEat === 'on'){
//       req.body.readyToEat = true;
//   } else {
//       req.body.readyToEat = false;
//   }
//   Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit)=>{
//      console.log(updatedFruit)
//       res.redirect(`/fruits/${req.params.id}`);
//   });
// });

app.put("/fruits/:id", (req, res) => {
  console.log('in put')
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit) => {
    if(!err){
      res.status(200).redirect(`/fruits/${req.params.id}`)
    } else {
      res.status(400).send(err)
    }
  })
})


// CREATE
app.post("/fruits", (req, res) => {
  console.log("2. controller")
  if (req.body.readyToEat === "on"){
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }


  Fruit.create(req.body, (error, createdFruit) => {
    if (!error) {
      res.status(200).redirect('/fruits')
    } else {
      res.status(400).send(error)
    }
  })

  // console.log(fruits)
  // redirects after creating fruit, to the Index page
  // res.redirect("/fruits")
})

// EDIT
// app.get('/fruits/:id/edit', (req, res)=>{
//   Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
//     if(!err){
//       res.render(
//         'Edit',
//       {
//         fruit: foundFruit //pass in the found fruit so we can prefill the form
//       }
//     );
//   } else {
//     res.send({ msg: err.message })
//   }
//   });
// });

// EDIT
app.get("/fruits/:id/edit", (req, res) => {
  Fruit.findById(req.params.id, (err, foundFruit) => {
    if (!err) {
      res.status(200).render("Edit", {fruit: foundFruit})
    } else {
      res.status(400).send({ msg: err.message })
    }
  })
})




// SHOW
app.get("/fruits/:id", (req, res) => {
  Fruit.findById(req.params.id, (error, foundFruit) => {
    if (!error) {
      res.status(200).render("Show", {fruit: foundFruit})
    } else {
      res.status(400).send(error)
    }
  })
  // res.send(fruits[req.params.indexOfFruit])
  // res.render("Show", {fruit: fruits[req.params.indexOfFruit]})
})



app.listen(PORT, () => { 
  console.log(`Listening on port: ${PORT}`)
});