const constants = require("utils/const.js");
const NodeError = require("models/errors.js").NodeError;

async function getElectrumConnectionDetails() {
  try {
    const port = constants.ELECTRUM_PORT;

    const ipAddress = constants.ELECTRUM_IP_ADDRESS;
    const ipConnectionString = `${ipAddress}:${port}:t`;

    const localAddress = constants.ELECTRUM_LOCAL_DOMAIN;
    const localConnectionString = `${localAddress}:${port}:t`;

    console.log("Electrum IP Address: ", ipAddress);
      console.log("Electrum Local Address: ", localAddress);

    return {
      ip: {
        address: ipAddress,
        port,
        connectionString: ipConnectionString,
      },
      local: {
        address: localAddress,
        port,
        connectionString: localConnectionString,
      },
    };
  } catch (error) {
    console.log("error: ", error);
    throw new NodeError("Unable to get Electrum hidden service url");
  }
}

module.exports = {
  getElectrumConnectionDetails,
};
