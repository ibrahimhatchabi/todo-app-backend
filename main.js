// var http = require('http');
var url = require('url');
var express = require('express');
var cors = require('cors');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'hbs_test_todoapp@outlook.com',
    pass: 'Passer123'
  }
});

var app = express();

app.use(cors());

app.get('/sendemail', function (req, res) { 
  var q = url.parse(req.url, true).query;
  var taskTitle = q.task;
  var mailOptions = {
    from: 'hbs_test_todoapp@outlook.com',
    to: 'ibrahimhatchabi@gmail.com',
    subject: '<no reply> new task added',
    html: `Hello there, <br><br> the task <strong>${ taskTitle }</strong> needs to be done!`
  };
  if (taskTitle) {
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end("Something went wrong : " + error);
        console.log(error);
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("Email sent successfully");
        console.log(info.response);
      }
    });
  }
});

app.listen(9999);

