var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var config = require('./config'); // get our config file
var bodyParser  = require('body-parser');


mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('Problema ao conectar com a base de dados ' + mongoUri);
});

require('./src/model/filaEmail');
var filaEmailController = require('./src/controller/filaEmail');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log('Iniciando envio de emails.');
filaEmailController. enviarEmails();
console.log('Encerrando envio de emails.');


