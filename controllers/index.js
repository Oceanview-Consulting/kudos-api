var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports = function(server, config) {
	var controllerDirectories = getDirectories(__dirname);

	_.forEach(controllerDirectories, (controllerDirectory) => require('./' + controllerDirectory)(server));
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}