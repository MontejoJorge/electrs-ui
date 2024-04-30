/* eslint-disable id-length */
module.exports = {
  REQUEST_CORRELATION_NAMESPACE_KEY: "umbrel-electrs-request",
  REQUEST_CORRELATION_ID_KEY: "reqId",

  ELECTRUM_IP_ADDRESS: process.env.ELECTRUM_IP_ADDRESS,

  ELECTRUM_LOCAL_DOMAIN: process.env.ELECTRUM_LOCAL_DOMAIN,

  ELECTRUM_PORT: process.env.ELECTRUM_PORT || 50001,
};
