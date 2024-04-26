const fs = require("fs");
const path = require('node:path'); 
const camelizeKeys = require("camelize-keys");
const RpcClient = require("bitcoind-rpc");

const BitcoindError = require("models/errors.js").BitcoindError;

const BITCOIND_RPC_PORT = process.env.BITCOIND_RPC_PORT || 8332;
const BITCOIND_HOST = process.env.BITCOIND_HOST || "localhost";
var BITCOIND_RPC_USER = process.env.BITCOIND_RPC_USER;
var BITCOIND_RPC_PASSWORD = process.env.BITCOIND_RPC_PASSWORD;
const BITCOIND_DIR = process.env.BITCOIND_DIR;

if (BITCOIND_DIR) {
   var auth = getAuthFromCookieFile(BITCOIND_DIR);
   BITCOIND_RPC_USER = auth[0];
   BITCOIND_RPC_PASSWORD = auth[1];
}

const rpcClient = new RpcClient({
  protocol: "http",
  user: BITCOIND_RPC_USER, // eslint-disable-line object-shorthand
  pass: BITCOIND_RPC_PASSWORD, // eslint-disable-line object-shorthand
  host: BITCOIND_HOST,
  port: BITCOIND_RPC_PORT
});

function promiseify(rpcObj, rpcFn, what) {
  return new Promise((resolve, reject) => {
    try {
      rpcFn.call(rpcObj, (err, info) => {
        if (err) {
          reject(new BitcoindError(`Unable to obtain ${what}`, err));
        } else {
          resolve(camelizeKeys(info, "_"));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

function getBlockChainInfo() {
  return promiseify(rpcClient, rpcClient.getBlockchainInfo, "blockchain info");
}

function getAuthFromCookieFile(btcDir) {
   const cookiePath = path.join(btcDir, ".cookie");

   if (fs.existsSync(cookiePath)) {
      try {
         var cookie = fs.readFileSync(cookiePath, "utf8");

         var auth = cookie.split(':');

         if (auth.length != 2) throw new Error("Error: auth cookie doesn't contain colon");

         return auth;

      } catch (e) {
         throw new Error(e);
      }
   } else {
      throw new Error("Cookie file not found");
   }
}

module.exports = {
  getBlockChainInfo
};
