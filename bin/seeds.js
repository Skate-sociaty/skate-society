// Seeds file that remove all users and create 2 new users
// To execute this seed, run from the root of the project
// $ node bin/seeds.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post= require('../models/Post')
const Events= require('../models/Events.js')
const bcryptSalt = 10;
mongoose
  .connect('mongodb://localhost/skate-society', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  let users = [
    {
      username: "Dani",
      password: bcrypt.hashSync("Dani", bcrypt.genSaltSync(bcryptSalt)),
      email:"dani@gmail.com",
      confpass:bcrypt.hashSync("Dani", bcrypt.genSaltSync(bcryptSalt)),
      status:"Pending Confirmation",
    },
    {
      username: "Miguel",
      password: bcrypt.hashSync("Miguel", bcrypt.genSaltSync(bcryptSalt)),
      email:"migueliron166@gmail.com",
      confpass:bcrypt.hashSync("Miguel", bcrypt.genSaltSync(bcryptSalt)),
      status:"Active",
    }
  ]

let post=[
  {
    picture:"URL",
    coments:'Hola que tal',
    video:"URL",
    ratio:5
  }
]

let event=[
  {
    title:'String',
    text:'String',
    place:'String',
    date:new Date(),
    join_us:[]
  }
]

Promise.all([User.deleteMany(),Events.deleteMany(),Post.deleteMany()])

.then(()=>{
  return User.create(users)
})
.then(usersCreated => {
  post[0].author= usersCreated[0].id;
  event[0].join_us.push(usersCreated[0].id)
  return Promise.all([Post.create(post),Events.create(event)])
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})