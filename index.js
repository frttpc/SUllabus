var express = require("express");
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const jwtSecret ='e67d339f91f9329e8b53c2d704cf74493169cea3b1394f249f2d3088870e7be2'

const port = process.env.PORT || 80;
const app = express();
const path = require('path');


app.set("/css", path.resolve(__dirname, "assets/css"))
app.set("/js", path.resolve(__dirname, "assets/js"))
app.set("/images", path.resolve(__dirname, "assets/images"))

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// MODELS
const User = require("../Sullabus-2 Test/public/server/models/user")
const Content = require("../Sullabus-2 Test/public/server/models/content")


// DATABASE
mongoose.connect("mongodb://localhost/SullabusDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to SullabusDB!')
})


const userRouter = require('../Sullabus-2 Test/public/server/routes/users')
const contentRouter = require('../Sullabus-2 Test/public/server/routes/contents')
app.use('/users', userRouter)
app.use('/contents', contentRouter)

/*
const info =  (req, res, next) => {
  const method = req.method
  const url = req.url
  const timeH = new Date().getHours()
  const timeM = new Date().getMinutes()
  console.log(method, url, timeH + ":" + timeM)
  next()
}

const auth = (req, res, next) => {
  const user = User.find();
  console.log(req.user)

  if(user)  //(user.isAuthorized)
  {
    req.user = {username: req.query.username, id: req.query.id}
    next()
  }
  else
  {
    res.status(401).send('Unauthorized')
    console.log(req)
  }
}
//app.use(info )
*/


// ROUTES
// Starting the server on the 80 port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// HOME
app.get("/", (req, res) => {

  if(!app.locals.user)
  {
    const user = ""
    return res.status(200).render('../public/views/home.ejs', { user } )
    
  }
  else
  {
    return res.status(200).render('../public/views/home.ejs', app.locals.user )
  }

});

// LOGIN
app.get("/login", (req, res) => {

  return res.status(200).render('../public/views/login.ejs', {msg:""})

});

app.post("/login", async(req, res) => {

  try
  {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).render('../public/views/login.ejs', {msg: "Please fill the boxes!"})
    }

    const user = await User.findOne({ email });


    if (user && (await bcrypt.compare(password, user.password))) {

      const token = jwt.sign(
        { user_id: user._id, email },
        jwtSecret,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      user.isAuthenticated = true;

      app.locals.user = user

      return res.status(200).redirect('/') 
    }
    else
    {
      return res.status(400).render('../public/views/login.ejs', {msg: "Email or password is incorrect!"})
    }

  }
  catch (err)
  {
    console.log(err)
  }
});

// LOGOUT
app.get("/logout", (req, res) => {

  app.locals.user = undefined

  return res.status(200).redirect('/')

});

// NOT FOUND
app.all('*', (req, res) => {

  return res.status(404).send('<h1> Source NOT found </h1>')
})