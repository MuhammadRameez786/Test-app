require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    // hardhat: {},
    
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/xIBH7P9EZ_MMBB70aN7KVWF8a6LnPRBg",
      accounts: [
        `0x${"2476db68696f9c507671a87a63475760ac30bddca32d6d2569f147fee8c84c55"}`,
      ],
    },
  },
};


// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
//   networks: {
//     // hardhat: {},
    
//     polygon_mainnet: {
//       url: "https://polygon-mainnet.g.alchemy.com/v2/dDLPKmZMUzSypOG6cBRmTCwWX9NljA_d",
//       accounts: [
//         `0x${"fcab45e9b773c4f7f159964f9a8bdf018753ca13cf895aa4c2fdaa5302e94db0"}`,
//       ],
//     },

//     ethereum_mainnet: {
//       url: "https://eth-mainnet.g.alchemy.com/v2/gKKI-idOorl5DLYZvk9FM9TrhlO1_UYa",
//       accounts: [
//         `0x${"fcab45e9b773c4f7f159964f9a8bdf018753ca13cf895aa4c2fdaa5302e94db0"}`,
//       ],
//     },
//   },
// };

// require("@nomiclabs/hardhat-ethers");

// module.exports = {
//   defaultNetwork: "matic",
//   networks: {
//     hardhat: {
//     },
//     matic: {
//       url: 'https://polygon-mumbai.g.alchemy.com/v2/xIBH7P9EZ_MMBB70aN7KVWF8a6LnPRBg',
//       accounts: ['2476db68696f9c507671a87a63475760ac30bddca32d6d2569f147fee8c84c55'],
//     }
//   },
//   solidity: {
//     version: "0.8.17",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts"
//   },
//   mocha: {
//     timeout: 20000
//   }
// }