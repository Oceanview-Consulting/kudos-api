'use strict';

var controller = {};
module.exports = controller;

controller.main = function(request, reply) {
	console.log(request.payload);
}