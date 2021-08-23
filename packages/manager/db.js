const mongoose = require("mongoose");
//const { log } = require("@spaship/common/lib/logging/pino");
const config = require("./config");

const uri = `mongodb://${config.get("db:mongo:url")}/${config.get("db:mongo:db_name")}`;

const connect = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  config.get("db:mongo:user") && (options.user = config.get("db:mongo:user"));
  config.get("db:mongo:password") && (options.pass = config.get("db:mongo:password"));
  await mongoose.connect(uri, options);
};

mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection is open to ", uri);
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection has occured " + err + " error");
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection is disconnected");
});

module.exports = {
  connect,
};
