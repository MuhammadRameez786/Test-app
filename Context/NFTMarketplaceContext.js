import React, { createContext, useState, useEffect, useContext } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
const CryptoJS = require('crypto-js');

// This should already be declared in your API file

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const projectId = "2NJsvBEmmvZhXzdTRZ8zsCgtKC5";
const projectSecretKey = "78df09bb9b83f3b80f6dec1d2125f821";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

const subdomain = "https://day-galpu-club.infura-ipfs.io";

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});
//console.log("IPFS client:", client);

//INTERNAL  IMPORT
import {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  transferFundsAddress,
  transferFundsABI,
  userProfileAddress,
  userProfileABI,
  nftCollectionAddress,
  nftCollectionABI,
} from "./constants";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};
  const fetchUserProfileContract = (signerOrProvider) =>
    new ethers.Contract(
      userProfileAddress,
      userProfileABI,
      signerOrProvider
    ); 

  const connectToUserProfile = async () => {
    try {
      const web3Modal = new Wenb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const usercontract = fetchUserProfileContract(signer);
      
  
      return usercontract;
      console.log("user", usercontract);
    } catch (error) {
      console.log('Error connecting to user profile contract:', error);
    }
  };

  const fetchNFTCollectionContract = (signerOrProvider) =>
    new ethers.Contract(
      nftCollectionAddress,
      nftCollectionABI,
      signerOrProvider
    );

    const connectToNFTCollection = async () => {
      try {
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchNFTCollectionContract(signer);
        return contract;
      } catch (error) {
        console.log('Error connecting to user profile contract:', error);
      }
    };  

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs";

  //------USESTAT
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [contract, setContract] = useState(null);
  const [usercontract, setUserContract] = useState(null);
  const [allCollections, setAllCollections] = useState([]);
  const router = useRouter();

  // const checkIfWalletConnected = async () => {
  //   try {
  //     if (!window.ethereum) {
  //       setOpenError(true);
  //       setError("Install MetaMask");
  //       return;
  //     }
  
  //     const accounts = await window.ethereum.request({
  //       method: "eth_accounts",
  //     });
  
  //     if (accounts.length) {
  //       setCurrentAccount(accounts[0]);
  //       //console.log("Current Account:", accounts[0]);
  
  //       // Fetch and log wallet balance
  //       const walletBalance = await getWalletBalance(accounts[0]);
  //       if (walletBalance !== null) {
  //         setAccountBalance(walletBalance);
  //       } else {
  //         // Handle the case where fetching the balance failed
  //         setOpenError(true);
  //         setError("Error fetching wallet balance");
  //       }
  //     } else {
  //       console.log("No account");
  //       // setError("No Account Found");
  //       // setOpenError(true);
  //     }
  //   } catch (error) {
  //     console.error("Error connecting to wallet:", error);
  //     // setError("Something wrong while connecting to wallet");
  //     // setOpenError(true);
  //     console.log("Not connected");
  //   }
  // };
  
  const getWalletBalance = async (account) => {
    try {
      if (!account) {
        //console.error("No account provided.");
        return null;
      }
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account);
      const formattedBalance = ethers.utils.formatEther(balance);
  
      return formattedBalance;
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      return null;
    }
  };
  
  // Call checkIfWalletConnected to trigger the process
  //checkIfWalletConnected();


  useEffect(() => {
    //checkIfWalletConnected();
    connectingWithSmartContract();
  }, []);

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(false), setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);

      // window.location.reload();
      connectingWithSmartContract();
    } catch (error) {
      // setError("Error while connecting to wallet");
      // setOpenError(true);
    }
  };
  

  //---UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error Uploading to IPFS");
      setOpenError(true);
    }
  };

    useEffect(() => {
      const initialize = async () => {
        try {
          const smartContract = await connectingWithSmartContract();
          const userProfileContract = await connectToUserProfile();
          //console.log('Smart Contract and User Profile Contract initialized successfully');
          setContract(userProfileContract); // Set the userProfileContract to the state
        } catch (error) {
          console.error('Error initializing contracts:', error);
        }
      };
  
      initialize();
    }, []);
    
  //------USER PROFILE-------//

    const createUser = async (name, email, profilePicture, profilebanner) => {
      console.log("CreateUser", name, email, profilePicture, profilebanner, currentAccount);
    
      if (!name || !email || !profilePicture) {
        return setError("Data Is Missing"), setOpenError(true);
      }
    
      const data = JSON.stringify({ name, email, profilePicture, profilebanner });
    
      try {
        // Log the data being added to IPFS
        console.log("Data to be added to IPFS:", data);
    
        const added = await client.add(data);
    
        // Log information about the added object
        console.log("IPFS Added Object:", added);
    
        if (!added || !added.cid) {
            throw new Error("IPFS add operation did not return expected result");
        }
    
        const ipfsCID = added.cid.toString(); // Convert CID to a string
        const url = `${subdomain}/ipfs/${ipfsCID}`;
        console.log("url", url);
        await signUser(name, email, profilePicture, profilebanner);
    
        // Continue with the rest of your logic...
    } catch (error) {
        console.error("CreateError", error);
        setError("Error while creating User");
        setOpenError(true);
    }
    };
    
    const signUser = async (name, email, profilePicture, profilebanner) => {
      try {
        // Connect to the user profile contract
        const contract = await connectToUserProfile();
    
        // Log information before the function call
        console.log("Calling registerUser function on the blockchain...");
    
        // Use the send method to send a transaction to the blockchain
        const transaction = await contract.registerUser(name, email, profilePicture, profilebanner);
        
        // Wait for the transaction to be mined
        await transaction.wait();
    
        // Log information after the function call
        console.log("registerUser function executed successfully.");
      } catch (error) {
        console.error("Error in registerUser function:", error);
        // Add additional error handling if needed
      }
    };
    
    const updateUser = async (name, email, profilePicture, profilebanner) => {
      try {
        if (currentAccount) {
          const contract = await connectToUserProfile();
          await contract.updateUser(name, email, profilePicture, profilebanner).send({ from: currentAccount });
          console.log('User updated successfully');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

    const getUser = async (userAddress) => {
      try {
        if (currentAccount) {
          const contract = await connectToUserProfile();
    
          // Check if the contract is defined before accessing the methods
          if (contract) {
            const userData = await contract.getUser(userAddress);
            console.log("users:", userData);
            return userData;  // return the user data if needed
          } else {
            throw new Error('Contract or methods are undefined');
          }
        }
      } catch (error) {
        console.error('Error getting user:', error);
        // Handle error or return a default value
      }
    };
    
  //----- NFT COLLECTION FUNCTION ------//

  const createNFTCollection = async (name, picture, banner, category) => {
    console.log("CreateNFTCollection", name, picture, banner, category, currentAccount);
  
    if (!name || !category) {
      return setError("Data Is Missing"), setOpenError(true);
    }
  
    const data = JSON.stringify({ name, picture, banner, category });
  
    try {
      // Log the data being added to IPFS
      console.log("Data to be added to IPFS:", data);
  
      const added = await client.add(data);
  
      // Log information about the added object
      console.log("IPFS Added Object:", added);
  
      if (!added || !added.cid) {
        throw new Error("IPFS add operation did not return expected result");
      }
  
      const ipfsCID = added.cid.toString(); // Convert CID to a string
      const url = `${subdomain}/ipfs/${ipfsCID}`;
      console.log("url", url);
  
      await signCollection(name, picture, banner, category);
  
      // Continue with the rest of your logic...
    } catch (error) {
      console.error("CreateError", error);
      setError("Error while creating NFTCollection");
      setOpenError(true);
    }
  };
  
  const signCollection = async (name, picture, banner, category) => {
    try {
      // Connect to the NFT collection contract
      const contract = await connectToNFTCollection();
  
      // Log information before the function call
      console.log("Calling createCollection function on the blockchain...");
  
      // Use the send method to send a transaction to the blockchain
      const transaction = await contract.createCollection(name, picture, banner, category);
  
      // Wait for the transaction to be mined
      await transaction.wait();
  
      // Log information after the function call
      console.log("createCollection function executed successfully.");
    } catch (error) {
      console.error("Error in createCollection function:", error);
      // Add additional error handling if needed
    }
  };
  
  

  const getUserCollections = async () => {
    try {
      if (currentAccount) {
        const contract = await connectToNFTCollection(); // Assume you have a function like this to connect to your NFT contract
        const userCollections = await contract.getUserCollections();
        return userCollections;
      }
    } catch (error) {
      console.error('Error getting user collections:', error);
      // Handle error or return a default value
      return [];
    }
  };
    
  //---CREATENFT FUNCTION
  const createNFT = async (name, price, image, description, router, website, royalties, fileSize, collectionName, currentAccount, ) => {
    console.log("CreateNFT", name, price,  description, collectionName);
    if (!name || !description || !price || !image)
      return setError("Data Is Missing"), setOpenError(true);

    const data = JSON.stringify({ name, description, image });

    try {
      const added = await client.add(data);

      const url = `${subdomain}/ipfs/${added.path}`;

      await createSale(url, false, null, price, name, image, description, website, royalties, fileSize, currentAccount, collectionName);
      // router.push("/searchPage");
    } catch (error) {
      console.log("CreatError", error);
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };

  const createSale = async (url, isReselling, id, formInputPrice, name, image, description, website, royalties, fileSize, currentAccount, collectionName) => {
    try {
      console.log(url, formInputPrice, isReselling, id, name, image, description, website, royalties, fileSize, currentAccount, collectionName);
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      console.log("Price:", ethers.utils.formatEther(price));
      console.log("Price2:", price);

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
      console.log(error);
    }
  };
  
  // const fetchNFTs = async (retryCount = 0) => {
  //   try {
  //     if (!currentAccount) {
  //       return;
  //     }
  
  //     const provider = new ethers.providers.JsonRpcProvider(
  //       "https://polygon-mumbai.g.alchemy.com/v2/xIBH7P9EZ_MMBB70aN7KVWF8a6LnPRBg"
  //     );
  //     const contract = fetchContract(provider);
  
  //     const data = await contract.fetchMarketItems();
  
  //     const items = await Promise.all(
  //       data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
  //         try {
  //           const tokenURI = await contract.tokenURI(tokenId);
  //           const url = await contract.getTokenUrl(tokenId);
  //           const {
  //             data: { image, name, description },
  //           } = await axios.get(url);
  
  //           const price = ethers.utils.formatUnits(
  //             unformattedPrice.toString(),
  //             "ether"
  //           );
  
  //           return {
  //             price,
  //             tokenId: tokenId.toNumber(),
  //             seller,
  //             owner,
  //             image,
  //             name,
  //             description,
  //             tokenURI,
  //             url,
  //           };
  //         } catch (error) {
  //           console.error("Error fetching NFT details:", error);
  //           // Handle individual item fetch error gracefully
  //           return null;
  //         }
  //       })
  //     );
  
  //     // Remove null values from items array (items with fetch errors)
  //     const filteredItems = items.filter((item) => item !== null);
  
  //     // console.log('Final items:', filteredItems);
  //     return filteredItems;
  //   } catch (error) {
  //     console.error("Error fetching NFTs:", error);
  
  //     if (error.response && error.response.status === 429) {
  //       // Implement exponential backoff
  //       const waitTime = Math.min(Math.pow(2, retryCount) * 1000, 64000); // Maximum backoff time is 64 seconds
  //       await new Promise(resolve => setTimeout(resolve, waitTime));
  
  //       // Retry with an incremented retry count
  //       return fetchNFTs(retryCount + 1);
  //     } else {
  //       setError("Error while fetching NFTS");
  //       setOpenError(true);
  //       return []; // Return an empty array in case of an error
  //     }
  //   }
  // };
  // const debounce = (func, delay) => {
  //   let timeoutId;
  
  //   return (...args) => {
  //     clearTimeout(timeoutId);
  
  //     timeoutId = setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // };

  // const debouncedFetchNFTs = debounce(fetchNFTs, 1000); // Adjust the debounce delay as needed

  // useEffect(() => {
  //   if (currentAccount) {
  //     debouncedFetchNFTs();
  //   }
  // }, [currentAccount, debouncedFetchNFTs]);

  // const fetchNFTs = async () => {
  //   try {
  //     if (currentAccount) {
  //       const provider = new ethers.providers.JsonRpcProvider(
  //         "https://polygon-mumbai.g.alchemy.com/v2/Gd_K-PgxidV-ArTJ0hwTg1wLC1jxYWSu",
  //       );
  //       console.log(provider);
  //       const contract = fetchContract(provider);

  //       //console.log("data before contract.fetchMarketItems()", data);

  //       const data = await contract.fetchMarketItems();

  //       //console.log("data after contract.fetchMarketItems()", data);

  //       const items = await Promise.all(
  //         data.map(
  //           async ({ tokenId, seller, owner, price: unformattedPrice }) => {
  //             const tokenURI = await contract.tokenURI(tokenId);
  //             //console.log("TkenURI", tokenURI);

  //             // const response = await fetch(tokenURI);
  //             // const data = await response.json();
  //             // console.log("Data:", data);
  //             //  const image = data.image;
  //             // // const name = data.name;
  //             // // const description = data.description;
  //             // const price = ethers.utils.formatUnits(
  //             //   unformattedPrice.toString(),
  //             //   "ether"
  //             // );

  //             const { data } = await axios.get(tokenURI).catch(error => {
  //               console.log(error.message);
  //               console.log(error.response);
  //               console.log(error.request);
  //               throw error;
  //             });
              
  //             if (!data) {
  //               throw new Error("Failed to fetch data from token URI");
  //             }
  //             const { image, name, description } = data;
  //             //console.log("Data:", data);
  //              //const image = data.image;
  //             // const name = data.name;
  //             // const description = data.description;
  //             const price = ethers.utils.formatUnits(
  //               unformattedPrice.toString(),
  //               "ether"
  //             );

  //             return {
  //               price,
  //               tokenId: tokenId.toNumber(),
  //               seller,
  //               owner,
  //               image,
  //               name,
  //               description,
  //               tokenURI,
  //             };
  //           }
  //         )
  //       );
  //       //console.log("items after Promise.all()", items);

  //       return items;
  //     }
  //   } catch (error) {
  //     setError("Error while fetching NFTS");
  //     setOpenError(true);
  //     console.log(error);
  //   }
  // };

  

  //--FETCHING MY NFT OR LISTED NFTs
  // const fetchMyNFTsOrListedNFTs = async (type) => {
  //   try {
  //     if (currentAccount) {
  //       const contract = await connectingWithSmartContract();

  //       const data =
  //         type == "fetchItemsListed"
  //           ? await contract.fetchItemsListed()
  //           : await contract.fetchMyNFTs();

  //       const items = await Promise.all(
  //         data.map(
  //           async ({ tokenId, seller, owner, price: unformattedPrice }) => {
  //             const tokenURI = await contract.tokenURI(tokenId);
  //             const {
  //               data: { image, name, description },
  //             } = await axios.get(tokenURI);
  //             const price = ethers.utils.formatUnits(
  //               unformattedPrice.toString(),
  //               "ether"
  //             );

  //             return {
  //               price,
  //               tokenId: tokenId.toNumber(),
  //               seller,
  //               owner,
  //               image,
  //               name,
  //               description,
  //               tokenURI,
  //             };
  //           }
  //         )
  //       );
        
  //       return items;
        
  //     }
  //   } catch (error) {
  //     // setError("Error while fetching listed NFTs");
  //     // setOpenError(true);
  //   }
  // };

  // useEffect(() => {
  //   fetchMyNFTsOrListedNFTs();
  // }, []);

  //---BUY NFTs FUNCTION
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      //console.log('Fetching NFTs...', type);
  
      if (currentAccount) {
        const contract = await connectingWithSmartContract();
  
        const data =
          type === "fetchItemsListed"
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs();
  
        const items = await Promise.all(
          data.map(
            async ({tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const url = await contract.getTokenUrl(tokenId);
              //console.log('Token URI:', tokenURI);
              //console.log('url:', url);
  
              const {
                data: { image, name, description },
              } = await axios.get(url);
  
              //console.log('Fetched data:', { image, name, description, data });
  
              const formattedPrice = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );
  
              return {
                price: formattedPrice,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
                url,
              };
            }
          )
        ); 
        //console.log('Final items:', items);
        return items;
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      // setError("Error while fetching NFTs");
      // setOpenError(true);
    }
  };
  
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.seller, {
        value: price,
      });

      await transaction.wait();
      router.push("/author");
    } catch (error) {
      console.log("ERROR>>", error);
      setError("Error While buying NFT");
      setOpenError(true);
    }
  };

  //------------------------------------------------------------------

  //----TRANSFER FUNDS

  const fetchTransferFundsContract = (signerOrProvider) =>
    new ethers.Contract(
      transferFundsAddress,
      transferFundsABI,
      signerOrProvider
    );

  const connectToTransferFunds = async () => {
    try {
      const web3Modal = new Wenb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchTransferFundsContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  //---TRANSFER FUNDS
  const [transactionCount, setTransactionCount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const transferEther = async (address, ether, message) => {
    try {
      if (currentAccount) {
        const contract = await connectToTransferFunds();
        console.log(address, ether, message);

        const unFormatedPrice = ethers.utils.parseEther(ether);
        // //FIRST METHOD TO TRANSFER FUND
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: address,
              gas: "0x5208",
              value: unFormatedPrice._hex,
            },
          ],
        });

        const transaction = await contract.addDataToBlockchain(
          address,
          unFormatedPrice,
          message
        );

        console.log(transaction);

        setLoading(true);
        transaction.wait();
        setLoading(false);

        const transactionCount = await contract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH ALL TRANSACTION
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectToTransferFunds();

        const avaliableTransaction = await contract.getAllTransactions();

        const readTransaction = avaliableTransaction.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));

        setTransactions(readTransaction);
        console.log(transactions);
      } else {
        console.log("On Ethereum");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //console.log('Context:', { createUser, contract, currentAccount });
  return (
    <NFTMarketplaceContext.Provider
      value={{
        //checkIfWalletConnected,
        getWalletBalance,
        connectWallet,
        uploadToIPFS,
        connectToUserProfile,
        connectToNFTCollection,
        signUser,
        createUser,
        updateUser,
        getUser,
        contract,
        usercontract,
        createNFTCollection,
        signCollection,
        getUserCollections,
        createNFT,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        setCurrentAccount,
        titleData,
        setOpenError,
        openError,
        error,
        transferEther,
        getAllTransactions,
        loading,
        accountBalance,
        transactionCount,
        transactions,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};