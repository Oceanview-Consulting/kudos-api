var controller = {};
module.exports = controller;

controller.main = function(request, reply) {
	return request.server.models.User.find({where: {aliases: {$contains: ['@tstokes']}}})
        .then(model => reply(model))
        .catch(err => {
            console.log(err.stack);
            reply('Not found!!');
        });
}

controller.hello = function(request, reply) {
	reply('Hello Admin!');
}