module.exports = router;

var express = require('express');
var mysql_dbc = require('../config/database')();
var connection = mysql_dbc.init();
var router = express.Router();

mysql_dbc.test_open(connection);




/* GET home page. */
router.get('/', function(req, res, next) {
  var params = '';
  var sql1 = `SELECT A.list_no, A.name, B.date 
  FROM list AS A LEFT JOIN history AS B
  ON A.list_no = B.list_no 
  WHERE B.date < date_add(now(), interval-7 day)
        OR B.date is null
  ORDER BY RAND() LIMIT 3;`;

  var sql2 = `SELECT 
  A.list_no, A.name
   FROM list A
  ORDER BY A.list_no asc;`;

  var sql3 = `SELECT A.list_no, A.name,
   DATE_FORMAT(B.date,'%y/%c/%e %a') as date
    FROM list AS A LEFT JOIN history AS B
  ON A.list_no = B.list_no 
  WHERE date_add(B.date, interval-7 day)
        OR B.date is not null order by B.date desc;`;

  connection.query(sql1 + sql2 + sql3, params, function (error, results, fields){

    if (!error) {
      console.log('first');
      res.render('index', {recommend_list: results[0], list: results[1], except_list: results[2]});
    }else{
      console.log('query error : ' + error);
    }

  });
  

});


/* GET Check page. */1
router.get('/check', function(req, res, next) {

  console.log('query req  : ' + req.query.list_no);

  var sql1 = `INSERT INTO history(list_no, date) values (`+req.query.list_no+`, now())`;
  connection.query(sql1, function (error, results, fields){
    if (!error) {
      console.log('query error : ' + error);
    }
  });

  res.redirect('/');

});


/* GET Clean */
router.get('/clean', function(req, res, next) {

  console.log('query req  : ');
  var sql1 = `delete FROM history where DATE_FORMAT(date,'%Y%m%d') = DATE_FORMAT(now(),'%Y%m%d')`;
  connection.query(sql1, function (error, results, fields){
    if (!error) {
      console.log("record clean");
    }else{
      console.log('query error : ' + error);
    }
  });

  res.redirect('/');

});

/* GET Add */
router.get('/add', function(req, res, next) {

  console.log('query req  : ');
  var sql1 = `INSERT INTO list(name) values ('`+req.query.name+`');`;
  connection.query(sql1, function (error, results, fields){
    if (!error) {
      console.log("1 record insert");
    }else{
      console.log('query error : ' + error);
    }
  });

  res.redirect('/');

});


/* GET Drop */
router.get('/drop', function(req, res, next) {

  console.log('query req  : ');
  var sql1 = `DELETE A,B FROM list AS A LEFT JOIN history AS B ON A.list_no = B.list_no  WHERE A.list_no =`+req.query.list_no+``;
  connection.query(sql1, function (error, results, fields){
    if (!error) {
      console.log("record delete");
    }else{
      console.log('query error : ' + error);
    }
  });

  res.redirect('/');

});


module.exports = router;