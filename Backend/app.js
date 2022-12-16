const Api = require("./lib/RestApi");
require("dotenv").config();

let { authparams } = require("./cred");
const twoFA = 649388;
authparams["twoFA"] = twoFA.toString();
console.log(authparams);
// return false;

api = new Api({
  susertoken:
    "440781742df4f29cbcd3652c3177af7c91e39956a6a24c4a667cacadee74b478",
  actid: process.env.USERID,
});

// 440781742df4f29cbcd3652c3177af7c91e39956a6a24c4a667cacadee74b478

// //search scrip example
api.searchscrip("NFO", "NIFTY DEC CE").then((reply) => {
  console.log(reply);
});

return false;
try {
  api
    .login(authparams)
    .then((res) => {
      if (res.stat == "Not_Ok") {
        console.log(res.stat);
        return false;
      }
      console.log("Reply: ", res);
    })
    .catch((err) => {
      console.log("error", err);
    });
} catch (e) {
  console.log(e);
}
