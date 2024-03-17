const { use } = require("chai");
const hre = require("hardhat");

async function main() {
  // const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  // const nftMarketplace = await NFTMarketplace.deploy();

  // await nftMarketplace.deployed();
  
  //USER PROFILE
  // const UserProfile = await hre.ethers.getContractFactory("UserProfile");
  // const userProfile = await UserProfile.deploy();

  // await userProfile.deployed();

  const NFTCollection = await hre.ethers.getContractFactory("NFTCollection");
  const nftCollection = await NFTCollection.deploy();

  await nftCollection.deployed();

  //TRANSFER FUNDS
  // const TransferFunds = await hre.ethers.getContractFactory("TransferFunds");
  // const transferFunds = await TransferFunds.deploy();

  // await transferFunds.deployed();  

  //console.log(` deployed contract Address ${nftMarketplace.address}`);
  //console.log(` deployed contract Address ${userProfile.address}`);  
  console.log(` deployed contract Address ${nftCollection.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// const hre = require("hardhat");

// async function main() {
//   const [deployer] = await ethers.getSigners();
//   console.log("Deploying contracts with the account:", deployer.address);
//   const balance = await deployer.getBalance();
//   console.log("Account balance:", ethers.utils.formatEther(balance));
  
//   console.log("Deploying NFTMarketplace contract...");
//   const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
//   const nftMarketplace = await NFTMarketplace.deploy({ gasPrice: ethers.utils.parseUnits('200', 'gwei'), gasLimit: 5000000 });

//   console.log("Waiting for NFTMarketplace deployment to complete...");
//   await nftMarketplace.deployed();

//   //TRANSFER FUNDS
//   // const TransferFunds = await hre.ethers.getContractFactory("TransferFunds");
//   // const transferFunds = await TransferFunds.deploy();

//   // await transferFunds.deployed();  

//   console.log(` deployed contract Address ${nftMarketplace.address}`);
//   //console.log(` deployed contract Address ${transferFunds.address}`);  
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// const hre = require("hardhat");

// async function main() {
//   const [deployer] = await ethers.getSigners();
//   console.log("Deploying contracts with the account:", deployer.address);
//   const balance = await deployer.getBalance();
//   console.log("Account balance:", ethers.utils.formatEther(balance));
  
//   console.log("Deploying NFTMarketplace contract...");
//   const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
//   const deploymentOptions = {
//     gasPrice: "0x0", // Set gas price to zero
//     gasLimit: 5000000, // Set gas limit if needed
//   };
//   const nftMarketplace = await NFTMarketplace.deploy(deploymentOptions);

//   console.log("Waiting for NFTMarketplace deployment to complete...");
//   await nftMarketplace.deployed();

//   console.log("Deployed contract Address:", nftMarketplace.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
