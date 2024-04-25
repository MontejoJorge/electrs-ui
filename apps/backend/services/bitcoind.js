const camelizeKeys = require("camelize-keys");
const RpcClient = require("bitcoind-rpc");

const BitcoindError = require("models/errors.js").BitcoindError;

const BITCOIND_RPC_PORT = process.env.BITCOIND_RPC_PORT || 8332;
const BITCOIND_HOST = process.env.BITCOIND_HOST || "localhost";
const BITCOIND_RPC_USER = process.env.BITCOIND_RPC_USER;
const BITCOIND_RPC_PASSWORD = process.env.BITCOIND_RPC_PASSWORD;

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

module.exports = {
  getBlockChainInfo
};
