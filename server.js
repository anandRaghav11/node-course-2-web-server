const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
console.log(port);

var app = express();
hbs.registerPartials(__dirname + '/Views/Partials')

app.set('view engine', 'hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  debugger;
  var log = `${now} : ${req.method}  ${req.url} `;
  console.log(`${log}`);

  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
        console.log('Unable to append to server.log file - ' + JSON.stringify(err,undefined,4));
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
  // res.send('<h1>helloExpress!</h1>');
  // res.send({
  //   name:'Raghav',
  //   likes:['reading','playing']
  // });
  console.log('home');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    name:'Raghav',
    Likes:['reading', 'playing'],
    currentYear : new Date().getFullYear()
  });
});

app.get('/about', (req,res) => {
  console.log('about');
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear : new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, ()=>{
  console.log(`Server is up on port ${3000}`);
});
