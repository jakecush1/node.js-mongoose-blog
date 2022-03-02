The following pages will display a basic CRUD application for a blog posting Webapp, using node.js, mongodb and mongoose to communicate between the two.

We have also used multiple other libraries for the functionality of the application to run,  these include libraries include:
mongoose, express, method-override, body-parser, ejs, router

To start out creating the app you must first run these commands:
npm init
npm -i mongoose express method-override body-parser ejs router

doing this will install the neccesary libraries for the app to run

the views folder holds all the .ejs files which render the html pages.  .ejs files are similar to HTML files, exccept they allow you to include code inside of them by using a special tag

inside the routes folder there is a articles.js file which most of the functionality of the applciation, and also links the functionality to the .ejs pages

the server.js file is the one that needs to be ran for the application to work.  this file connects to the database, listens and on port 3001 and makes the website work.  it requires the libraries needed for the app to function, and also renders the index page

you will need some basic understanding of node.js to understand these files and how this application functions

here is a link of a tutorial of a application that runs very similarly
https://www.youtube.com/watch?v=1NrHkjlWVhM&t=3000s&ab_channel=WebDevSimplified
