var Connection = require('tedious').Connection;
var config = {
  userName: 'MSFTFood@myfoodnutrition.database.windows.net',
  password: 'FoodIsGreat!',
  server: 'myfoodnutrition.database.windows.net',
  options:{encrypt: true, database: 'MyFoodNutrition', rowCollectionOnRequestCompletion: true}
};
var connection = new Connection(config);
connection.on('connect', function(err){
  if(err)
    console.error(err);
  console.log("Connected");
});

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;



var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('.'));
app.get('/', function(request, response){response.sendFile(__dirname + '/index.html');});

app.post('/query', function(request, response){
  var res = executeStatement(request.body.query, function(result){
    console.log('SENDING');
    response.send(result.map(function(x){return x[0].value;}));
  });
});

app.listen(80);



function executeStatement(req, callback){
  console.log("asdfgh");
  var request = new Request(req, function(err, rowCount, rows){
    if(err){
      console.log(err);
    }
    console.log('database ready to query');
    console.log(rows, rowCount);
    console.log('asdfghjmk,.');
    callback(rows);
  });
  connection.execSql(request);

  //request.on('row',function(columns){
  //  var result = "";
  //  columns.forEach(function(column){
  //    if(column.value === NULL){
  //      console.log('NULL');
  //    }else{
  //      result += column.value + " ";
  //      count++;
  //    }
  //  });
  //  arr.push(result);
  //});
/*
  request.on('done', function(rowCount, more, rows){

    console.log(rowCount + ' rows returned');
  });
*/
}
