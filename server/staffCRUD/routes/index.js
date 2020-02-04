var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

/*var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1',
  database : 'staffCRUD',
  multipleStatements: true
});*/
 
var db = require('../db');
router.get('/staff', function(req, res, next) {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);
  var offset = ((page - 1) * limit) + "";
  var sql = `select * from staff order by staffId desc limit ${limit} offset ${offset};select count(*) as count from staff`;
  var data = {};  
connection.query(sql, function (error, results, fields) {
  	if (error) throw error;
  		data["code"] = 0;
            data["msg"] = "";
            data["count"] = results[1][0]["count"];
            data["data"] = results[0];
            res.json(data);
}); 

});
  
router.post('/staff/:id', function(req, res, next) {
  var staffId = req.params.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var major = req.body.major;
  var bio = req.body.bio;
  var age = req.body.age;
  var grade = req.body.grade;
  var gpa = req.body.gpa;
  var gender = req.body.gender;
  var sql = `update staff set firstName='${firstName}', lastName='${lastName}', major='${major}', bio='${bio}', age='${age}', grade='${grade}',gpa='${gpa}',gender='${gender}' where staffId='${staffId}'`;
  
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
            res.json({ code : 1 });
});
});

router.get('/deleteStaff/:id', function(req, res, next) {
  var staffId = req.params.id;
  var sql = `delete from staff where staffId=${staffId}`;
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.json({ code : 1 });

});

});  

router.post('/staff', function(req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var major = req.body.major; 
  var bio = req.body.bio;
  var age = req.body.age;
  var grade = req.body.grade;
  var gpa = req.body.gpa;
  var gender = req.body.gender; 
  var sql = `insert into staff (firstName, lastName, major, bio, age, grade, gpa, gender) values ('${firstName}','${lastName}','${major}','${bio}','${age}','${grade}','${gpa}','${gender}')`;
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
            res.json({ code : 1 });
});
});

router.get('/searchStaff', function(req, res, next) {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);
  var offset = ((page - 1) * limit) + "";
  var sql1 = `select * from staff`;
  var sql2 = `select count(*) as count from staff`;
  var term = req.query.term;
	if (term !== ""){
            sql1 += " where firstName like '%" + term + "%'";
            sql2 += " where firstName like '%" + term + "%'";
        }
  sql1 += ` order by staffId desc limit ${limit} offset ${offset}`;
  var sql = sql1 + ";" + sql2;
var data = {};  
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
                data["code"] = 0;
            data["msg"] = "";
            data["count"] = results[1][0]["count"];
            data["data"] = results[0];
            res.json(data);
}); 
  
});
module.exports = router;
