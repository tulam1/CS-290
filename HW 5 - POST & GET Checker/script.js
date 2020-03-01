var express = require('express');
var bodyParser = require("body-parser");

var app = express();
var handlebars = require("express-handlebars").create({defaultLayout: "main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set('port', 9332);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    var get_param = [];
    for (var prop in req.query) {
        get_param.push({'name':prop, 'value':req.query[prop]})
	 }

    var get_context = {};
    get_context.dataList = get_param;
    res.render('GET-Request', get_context);
});

app.post('/', function(req,res){
  	 var qParams = [];
    for (var p in req.query){
    	  qParams.push({'name':p,'value':req.query[p]})
  	 }

	 var bParams = [];
	 for (var b in req.body) {
    	  bParams.push({'name':b,'value':req.body[b]})
	 }

  	 var context = {};
  	 context.queryList = qParams;
	 context.bodyList = bParams;
  	 res.render('POST-Request', context);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
