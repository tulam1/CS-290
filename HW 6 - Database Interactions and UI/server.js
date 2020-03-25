var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout: "main"});

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_lamtu',
  password        : 'Dannylam123',
  database        : 'cs290_lamtu'
});

module.exports.pool = pool;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 2492);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//This is for resetting the content of the table
app.get('/reset-table',function(req, res, next) {
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err) {
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

//This is for rendering the content of table onto home.handlebars
app.get('/', function(req, res, next) {
    var context = {};
    pool.query("SELECT * FROM workouts", function(err, rows, fields) {
        if (err) {
            next(err);
            return;
		}

        var object = {};
        object.workouts = [];
        for(var i in rows) {
            var object2 = {};

            object2.id = rows[i].id;
            object2.name = rows[i].name;
            object2.reps = rows[i].reps;
            object2.weight = rows[i].weight;
            object2.lbs = rows[i].lbs;
            object2.date = rows[i].date;

            object.workouts.push(object2);
		}

        context.results = JSON.stringify(rows);
        context.data = object;
        res.render('home', context);
	});
});

//This is for deleting a row
app.delete('/', function(req, res, next) {
    var context = {};
    mysql.pool.query("DELETE FROM workouts WHERE id=?" [req.query.id], function(err, result) {
        if (err) {
            next(err);
            return;
		}

        context.results = "Deleted " + result.changedRows + " rows.";
        res.render('home',context);
	});
});

//This for inserting data into the data
app.post('/',function(req, res, next) {
    var context = {};
    pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
            [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], 
            function(err, result) {
                if(err) {
                    next(err);
                    return;
                }

                pool.query("SELECT * FROM workouts WHERE id=?", [result.insertId], function(err, result) {
                    if (err) {
                        next(err);
                        return;
					}
                    res.send(JSON.stringify(result[0]));
				});
    });
});

//This is for a safe update in the Table
app.put('/',function(req,res,next){
    var context = {};
    mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
        next(err);
        return;
    }
    if(result.length == 1){
        var current = result[0];
        pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.query.name || current.name, req.query.reps || current.reps, req.query.weight || current.weight,
        req.query.date || current.date, req.query.lbs || current.lbs, req.query.id], function(err, result){
                if(err) {
                    next(err);
                    return;
                }
                pool.query('SELECT * FROM workouts', function(err, rows, fields) {
                    if(err) {
                        next(err);
                        return;
                    }

                    var data = {};
                    data.workouts = [];
                    for (var row in rows) {
                        var data2 = {};

                        data2.id      = rows[row].id;
                        data2.name    = rows[row].name;
                        data2.reps    = rows[row].reps;
                        data2.weight  = rows[row].weight;
                        data2.date    = rows[row].date;
                        data2.lbs     = rows[row].lbs;

                        data.workouts.push(data2);
                    }

                    context.results = JSON.stringify(rows);
                    context.data = data;

                    res.render('home', context);
                });
            });
        }
    });
});

//This is for the edit page
app.get('/edit', function(req, res, next){
    var context = {};

    mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result) {
        if(err) {
            next(err);
            return;
        }

        context.id = result[0].id;
        context.name = result[0].name;
        context.weight = result[0].weight;
        context.reps = result[0].reps;
        context.date = result[0].date;
        context.lbs = result[0].lbs;

        res.render('update', context);
    });
});

//Error 404
app.use(function(req, res){               
	res.status(404);
	res.render('404');
});

//Error 500
app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get("port"), function(){        
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});