const express = require('express');
const app = express();
const helmet = require("helmet")


let ninetyDaysInSeconds= 90*24*60*60

app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard({action:"deny"})) // this stops people putting your site in an aframe and using it for clickjacking
app.use(helmet.xssFilter())

app.use(helmet.noSniff())
// this is used to reduce MIME sniffing
app.use(helmet.ieNoOpen())
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force:true}))
//asking users to avoid insecure http
app.use(helmet.dnsPrefetchControl()) // this results in high security but performance can go down
app.use(helmet.noCache())

//content security policiy- prevent injection by allowing a list of content 
app.use(helmet.contentSecurityPolicy({directives:{defaultSrc:["'self'"], scriptSrc:["'self'", "trusted-cdn.com"]}}))










































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
