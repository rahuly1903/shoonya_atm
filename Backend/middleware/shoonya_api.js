const Api = require("../lib/RestApi");

const fs = require("fs");

const token = fs.readFileSync("token.txt", { encoding: "utf8", flag: "r" });

const shoonay_api = new Api({
  susertoken: token.toString(),
  actid: "FA54017",
});

module.exports = shoonay_api;
