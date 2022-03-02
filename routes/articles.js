// require express for basic CRUD app operations, Article is to access the article Schema, and router is a method of express used for routing functions to different pages when they are called

const express = require('express');
const Article = require('./../models/article')  //this is so we can access the articleSchema created in ../models/article.js
const router = express.Router();

//this app is for rendering the new.ejs page and sending a new article template Schema for the form to insert into the DB
router.get('/new', (req,res) => {
  res.render("articles/new", { article: new Article() });
})

//this app retrieves the new article and then runs the saveArticleAnd Redirect app with the parameter 'new' for a new article 
router.post('/', async (req,res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

//this app renders the edit page, and sends the information of the article with it 
router.get('/edit/:id', async (req,res) => {
  const article = await Article.findById(req.params.id)
  res.render("articles/edit", { article: article });
})

//this app is for rendering the show.ejs page, and uses the title as the slug for the url
router.get ('/:slug', async (req,res) => {
  const article = await Article.findOne({slug: req.params.slug})
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article})

})

//this app is used in the edit function, it uses the ID to identify the post to edit, and the information from the article to appear in the boxes
router.put('/:id', async (req,res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

//the post and update put app are very similar so we created a function that will hand them both
//the following function gets the information from the article, updates it from the form and then saves it to the database
function saveArticleAndRedirect(path) {
  return async (req,res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
  try{
    article = await article.save()
    res.redirect(`/articles/${article.slug}`)
  } catch (e) {
      res.render(`articles/${path}`, {article: article})
  }
  }
}

//this app uses the .delete method to delete the post by id, then redirect to the homepage
router.delete('/:id', async (req,res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router;
