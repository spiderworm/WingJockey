
require("babel/register");

var Server = require("./Server");

var server = new Server();

require("./webserver");
