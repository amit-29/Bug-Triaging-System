const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const web = require('./routes/web');
const mongoose = require('mongoose');
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const Tester = require('./models/tester');
const Developer = require('./models/developer');
const Manager = require('./models/manager');


const MONGODB_URI = 'mongodb+srv://amitsumit:amitsumit12345@cluster0.ypyfy.mongodb.net/test';
const app = express();
const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'  
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}));
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  if(req.session.manager==true){
    Manager.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  }
  else if(req.session.developer==true){
    Developer.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  }
else{
    Tester.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
}
  
});

app.use('/', web);

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(
    MONGODB_URI,{ useNewUrlParser: true }
  )
  .then(result => {
    app.listen(3000);
    console.log('server started')
  })
  .catch(err => {
    console.log(err);
  });











