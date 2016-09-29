var convict = require('convict');

// Define a schema
var conf = convict({
    env: {
        doc: "The applicaton environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    host: {
        doc: "The host address to bind.",
        format: String,
        default: "127.0.0.1",
        env: "HOST",
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3000,
        env: "PORT"
    },
    connectionString: {
        doc: "The database connection string",
        format: String,
        env: "DATABASE_URL",
        default: ''
    },
    initData: {
        doc: "Whether the database should be re-initialized and re-seeded on startup",
        format: Boolean,
        env: "initData",
        default: false,
        arg: "initData"
    }
});

// Load environment dependent configuration
var env = conf.get('env');
conf.load(require('./' + env + '.js'));

// Perform validation
conf.validate({strict: true});

module.exports = conf;
