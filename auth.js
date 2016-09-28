'use strict';

const AuthBearer = require('hapi-auth-bearer-token');
const jwt = require('jsonwebtoken');

module.exports = function(server, config) {
    console.log("Registering auth...");
    return new Promise(function(resolve, reject) {
        server.register(AuthBearer, (err) => {
            if(err) {
                return reject(err);
            }

            server.auth.strategy('token', 'bearer-access-token', {
                allowQueryToken: true,              // optional, true by default
                allowMultipleHeaders: false,        // optional, false by default
                accessTokenName: 'token',    // optional, 'access_token' by default
                validateFunc: function (token, callback) {
                    return callback(null, true, {scope: ['cli', 'admin']}, {stuff: 'stuff1'});
                    // For convenience, the request object can be accessed
                    // from `this` within validateFunc.
                    var request = this;
                    var payload = null;
                    try {
                        tokenPayload = jwt.verify(token, config.tokenSecret);
                    } catch (e) {
                        return callback(err);
                    }

                    if(tokenPayload == null || !tokenPayload.userid)
                    {
                        return callback(new Error("Invalid authentication payload"));
                    }

                    return callback(null, true, tokenPayload);
                }
            });

            server.auth.default('token');
            return resolve();
        });
    });
}
