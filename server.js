const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+"/public"));


app.use((req,res,next)=>{
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile("server.log",log + '\n',(err)=>{
	if(err)
		cosole.log('Unable to append to Server.log');
});
next();
});


// app.use((req,res,next)=>{
// 	res.render('maintainence.hbs')
// });


hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase(text);
});


app.get('/',(req,res)=>{
	res.render('home.hbs',{
		welcomeMes:'Hello, welcome to my home page',
		pageTitle:'Home page'
	})
	});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page'
	});
})


app.listen(port,()=>{
	console.log(`server is up on ${port}`)
});

