// Seeds file that remove all users and create 2 new users
// To execute this seed, run from the root of the project
// $ node bin/seeds.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post= require('../models/Post')
const Events= require('../models/Events.js')
const bcryptSalt = 10;
const Parks=require('../models/Parks')
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
      imageURL,
      username: "Dani",
      password: bcrypt.hashSync("Dani", bcrypt.genSaltSync(bcryptSalt)),
      email:"dani@gmail.com",
      confpass:bcrypt.hashSync("Dani", bcrypt.genSaltSync(bcryptSalt)),
      status:"Pending Confirmation",
    },
    {
      imageURL,
      username: "Miguel",
      password: bcrypt.hashSync("Miguel", bcrypt.genSaltSync(bcryptSalt)),
      email:"migueliron166@gmail.com",
      confpass:bcrypt.hashSync("Miguel", bcrypt.genSaltSync(bcryptSalt)),
      status:"Active",
    }
  ]
  

let post=[
  {
    pictureURL ,
    text:'esto es un texto de muestra',
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
    date:'String',
    time:'String',
    join_us:[]
  }
]
let parks=[
  {
    position: {
      lat:40.395528,
      lng:-3.703376
    },
    
  },
  {
    position: {
      lat:40.400877,
      lng:-3.709279
    },
   
  },
  {
    position: {
      lat:40.416435,
      lng:-3.676630
    },
   
  },
  {
    position: {
      lat:40.469975,
      lng:-3.709645
    },
   
  },
  {
    position: {
      lat:40.477313,
      lng:-3.663779
    },
   
  },
  {
    position: {
      lat:40.489088,
      lng:-3.645213
    },
   
  },
  {
    position: {
      lat:40.441962,
      lng:-3.625142
    },
   
  },
  {
    position: {
      lat:40.428884,
      lng:-3.547320
    },
   
  },
  {
    position: {
      lat:40.380641,
      lng:-3.609067
    },
   
  },
  {
    position: {
      lat:40.363223,
      lng:-3.550828
    },
   
  },
  {
    position: {
      lat:40.362062,
      lng:-3.685990
    },
   
  },
  {
    position: {
      lat:40.353924,
      lng:-3.676987
    },
   
  },
  {
    position: {
      lat:40.350005,
      lng:-3.699253
    },
   
  },
  {
    position: {
      lat:40.343512,
      lng:-3.689264
    },
   
  },
  {
    position: {
      lat:40.295053,
      lng:-3.741664
    },
   
  },
  {
    position: {
      lat:40.339415,
      lng:-3.756732
    },
   
  },
  {
    position: {
      lat:40.337402,
      lng:-3.745969
    },
   
  },
  {
    position: {
      lat:40.337464,
      lng:-3.746002
    },
   
  },
  {
    position: {
      lat:40.383343,
      lng:-3.712013
    },
   
  },
  {
    position: {
      lat:40.390579,
      lng:-3.730654
    },
   
  },
  
]
Promise.all([User.deleteMany(),Events.deleteMany(),Post.deleteMany(),Parks.deleteMany()])

.then(()=>{
  return User.create(users)
})
.then(usersCreated => {
  post[0].author= usersCreated[0].id;
  event[0].join_us.push(usersCreated[0].id)
  return Promise.all([Post.create(post),Events.create(event),Parks.create(parks)])
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})