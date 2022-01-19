/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { API_URL_TEST, PRIVATE_KEY_TEST } = process.env;
console.log(API_URL_TEST, PRIVATE_KEY_TEST);
module.exports = {
  solidity: "0.7.0",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: API_URL_TEST,
      accounts: [`0x${PRIVATE_KEY_TEST}`],
      gas: 2100000,
      gasPrice: 8000000000,
      saveDeployments: true,
    },
    //  ropsten: {
    //    url: API_URL,
    //    accounts: [`0x${PRIVATE_KEY}`],
    //  },
  },
};
