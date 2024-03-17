import React, { createContext, useState, useEffect, useContext } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

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
  },
});

//INTERNAL  IMPORT
import {
    userProfileAddress,
    userProfileABI,
} from "./constants";

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
      const contract = fetchUserProfileContract(signer);
      console.log('Connected to user profile contract:', contract);
  
      return contract;
    } catch (error) {
      console.log('Error connecting to user profile contract:', error);
    }
};

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  
    //------USESTAT
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const [contract, setContract] = useState(null);
    const router = useRouter();
  
    //---CHECK IF WALLET IS CONNECTD
    const checkIfWalletConnected = async () => {
      try {
        if (!window.ethereum)
          return setOpenError(true), setError("Install MetaMask");
  
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
  
        if (accounts.length) {
          setCurrentAccount(accounts[0]);
           console.log(accounts[0]);
        } else {
          // setError("No Account Found");
           //setOpenError(true);
          console.log("No account");
        }
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getBalance = await provider.getBalance(accounts[0]);
        const bal = ethers.utils.formatEther(getBalance);
        setAccountBalance(bal);
      } catch (error) {
        // setError("Something wrong while connecting to wallet");
        // setOpenError(true);
        console.log("not connected");
      }
    };
  
  
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
      
      const createUser = async (name, email, profilePicture, encryptedData) => {
        console.log("CreateUser", name, email, profilePicture, encryptedData, currentAccount);
      
        if (!name || !email || !profilePicture) {
          return setError("Data Is Missing"), setOpenError(true);
        }
      
        const data = JSON.stringify({ name, email, profilePicture });
      
        try {
          const added = await client.add(data);
      
          const url = `${subdomain}/ipfs/${added.path}`;
      
          // Register user on the blockchain
          await registerUser(url, name, email, profilePicture, encryptedData);
      
          // Log confirmation after successful registration
          console.log('User created successfully with data:', { name, email, profilePicture, encryptedData });
      
          // Handle success or navigate to the desired page
          // router.push("/searchPage");
        } catch (error) {
          console.log("CreatError", error);
          setError("Error while creating User");
          setOpenError(true);
        }
      };
      
      const registerUser = async (url, name, email, profilePicture, encryptedData) => {
        // Connect to the user profile contract
        const contract = await connectToUserProfile();
      
        // Check if the contract and methods are defined
        if (contract && contract.methods) {
          // Call the registerUser function on the blockchain
          await contract.methods.registerUser(url, name, email, profilePicture, encryptedData).send({ from: currentAccount });
        } else {
          throw new Error('Contract or methods are undefined');
        }
      };
      
      
    //   const updateUser = async (name, email, profilePicture, encryptedData) => {
    //     try {
    //       if (currentAccount) {
    //         const contract = await connectToUserProfile();
    //         await contract.methods.updateUser(name, email, profilePicture, encryptedData).send({ from: currentAccount });
    //         console.log('User updated successfully');
    //       }
    //     } catch (error) {
    //       console.error('Error updating user:', error);
    //     }
    //   };
  
    //   const getUser = async (userAddress) => {
    //     try {
    //       if (currentAccount) {
    //         const Usercontract = await connectToUserProfile();
    //         console.log("Userontract", Usercontract);
      
    //         // Check if the contract is defined before accessing the methods
    //         if (Usercontract && Usercontract.methods) {
    //           const userData = await Usercontract.methods.getUser(userAddress).call();
    //           console.log('User Data:', userData);
    //           return userData;  // return the user data if needed
    //         } else {
    //           throw new Error('Contract or methods are undefined');
    //         }
    //       }
    //     } catch (error) {
    //       console.error('Error getting user:', error);
    //       // Handle error or return a default value
    //     }
    //   };
 
    //console.log('Context Values1:', { createUser, contract, currentAccount });
    return (
      <UserContext.Provider
        value={{
          checkIfWalletConnected,
          connectWallet,
          uploadToIPFS,
          registerUser,
          createUser,
          //updateUser,
          //getUser,
          contract,
          currentAccount,
          setCurrentAccount,
          setOpenError,
          openError,
          error,
        }}
      >
        {children}
      </UserContext.Provider>
    );
};