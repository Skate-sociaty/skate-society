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
      // imageURL,
      username: "Dani",
      password: bcrypt.hashSync("Dani", bcrypt.genSaltSync(bcryptSalt)),
      email:"dani@gmail.com",
      confpass:bcrypt.hashSync("Dani", bcrypt.genSaltSync(bcryptSalt)),
      status:"Pending Confirmation",
    },
    {
      // imageURL,
      username: "Miguel",
      password: bcrypt.hashSync("Miguel", bcrypt.genSaltSync(bcryptSalt)),
      email:"migueliron166@gmail.com",
      confpass:bcrypt.hashSync("Miguel", bcrypt.genSaltSync(bcryptSalt)),
      status:"Active",
    }
  ]
  

let post=[
  {
    // pictureURL ,
    text:'esto es un texto de muestra',
    coments:'Hola que tal',
    video:"URL",
    ratio:5
  }
]

let event=[
  {
    title:'Megaparty',
    text:'Si lo quuieres flipar apuntate',
    place:'My house',
    date:'Según me pille',
    time:'tarde a ser posible',
    join_us:[]
  }
]
let parks=[
  {
    position: {
      lat:40.395528,
      lng:-3.703376
    },
    title:"Skatepark Madrid Rio"
    
  },
  {
    position: {
      lat:40.400877,
      lng:-3.709279
    },
    title:"Pistas patinaje"
  },
  {
    position: {
      lat:40.416435,
      lng:-3.676630
    },
    title:"Parking Coches Plaza de Colón"
  },
  {
    position: {
      lat:40.469975,
      lng:-3.709645
    },
    title:"Skate plaza"
  },
  {
    position: {
      lat:40.477313,
      lng:-3.663779
    },
    title:"Skatepark Manoteras"
  },
  {
    position: {
      lat:40.489088,
      lng:-3.645213
    },
    title:"Skatepark Sanchinarro"
  },
  {
    position: {
      lat:40.441962,
      lng:-3.625142
    },
    title:"Bowl Suanzes"
  },
  {
    position: {
      lat:40.428884,
      lng:-3.547320
    },
    title:"Skatepark Ayende"
  },
  {
    position: {
      lat:40.380641,
      lng:-3.609067
    },
    title:"Half pipe"
  },
  {
    position: {
      lat:40.363223,
      lng:-3.550828
    },
    title:"Skatepark Rivas-Vaciamadrid"
  },
  {
    position: {
      lat:40.362062,
      lng:-3.685990
    },
    title:"Skatepark Minguito"
  },
  {
    position: {
      lat:40.353924,
      lng:-3.676987
    },
    title:"Skatepark Manzanares"
  },
  {
    position: {
      lat:40.350005,
      lng:-3.699253
    },
    title:"Skatepar(Puente Alcocer)"
  },
  {
    position: {
      lat:40.343512,
      lng:-3.689264
    },
    title:"Skatepark San Cristobal"
  },
  {
    position: {
      lat:40.295053,
      lng:-3.741664
    },
    title:"Skatepark Getafe"
  },
  {
    position: {
      lat:40.339415,
      lng:-3.756732
    },
    title:"Skatepark Leganes"
  },
  {
    position: {
      lat:40.337402,
      lng:-3.745969
    },
    title:"Skatepark Antiguo Leganes"
  },
  {
    position: {
      lat:40.337464,
      lng:-3.746002
    },
    title:"Minirampas Skate"
  },
  {
    position: {
      lat:40.383343,
      lng:-3.712013
    },
    title:"Skatepark"
  },
  {
    position: {
      lat:40.390579,
      lng:-3.730654
    },
    title:"50 Projects Indoor"
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