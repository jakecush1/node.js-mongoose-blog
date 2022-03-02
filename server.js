//  First off we require some modules that we will be using to make this CRUD application work: express is a node.js framwork for building web apps.  body-parser is used to parse HTTP requests, ejs renders HTML data and is used to retrieve data from HTML, 
//Mongoose is the library we will using to interact with mongodb, method-override is a library we use to allow us to override the methods of certain forms, where we cant to delete and put
//articleRouter and Article are just paths to other pages to make the code cleaner
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const ejs = require('ejs');

//next we need to choose our database and connect to it, which is done in the following lines
var db ='mongodb://localhost/blogapp';
mongoose.connect(db);

//tells the server to convert ejs code to html to print on the page
app.set('view engine','ejs');
//allow express to access 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


//INDEX PAGE
// this app.get will be an running asynchronous function- meaning it runs these all; at the same time
app.get('/', async (req,res) => {
  
  //here we neame the variable articles to the path declared about and sort them by from newest to oldest
  const articles = await Article.find().sort({
    createdAt:'desc'
  })
  //res.render will render the index page, while also sending through the new variable we just declared as an object named articles
  res.render('articles/index', { articles: articles }); 
  
});

//everything created in the article router will be after url/articles 
app.use('/articles', articleRouter)

//here the app listens to requests sent to port 3001, then console logs "app listening"
app.listen(3001,function(){
  console.log('app listening');
});

