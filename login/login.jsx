// import React, { useState, useContext, useEffect} from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// //INTERNALIMPORT
// import Style from "./login.module.css";
// import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext.js";
// //import { UserContext } from "../Context/UserContext.js";
// const login = () => {
//   const { createUser, connectToUserProfile, currentAccount } = useContext(NFTMarketplaceContext);
//   //console.log('Context Values:', { createUser, connectToUserProfile, currentAccount });
  
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [profilePicture, setProfilePicture] = useState('');
//   const [profilebanner, setProfileBanner] = useState('');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!createUser || !connectToUserProfile || !currentAccount) {
//       // Render loading state or handle the absence of required context values
//       //console.log('Loading...');
//     }
//   }, [createUser, connectToUserProfile, currentAccount]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       // Call createUser function with form data
//       await createUser(name, email, profilePicture, profilebanner);

//       // Log submitted data upon successful submission
//       console.log('User created successfully:');
//       console.log('Name:', name);
//       console.log('Email:', email);
//       console.log('Profile Image:', profilePicture);
//       console.log('Profile Banner:', profilebanner);

//       // Reset form fields and error state
//       setName('');
//       setEmail('');
//       setProfilePicture('');
//       setProfileBanner('');
//       setError(null);
//     } catch (error) {
//       // Handle error
//       console.error('Error creating user:', error);
//       setError('Error creating user. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//       </label>
//       <br />

//       <label>
//         Email:
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       </label>
//       <br />

//       <label>
//         Profile Image URI:
//         <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Sensitive Data:
//         <input type="text" value={profilebanner} onChange={(e) => setProfileBanner(e.target.value)} />
//       </label>
//       <br />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default login;

import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// INTERNAL IMPORT
import Style from "./login.module.css";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext.js";

const Login = () => {
  const { createUser, connectToUserProfile, currentAccount, uploadToIPFS } = useContext(NFTMarketplaceContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileBanner, setProfileBanner] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!createUser || !connectToUserProfile || !currentAccount) {
      // Render loading state or handle the absence of required context values
      //console.log('Loading...');
    }
  }, [createUser, connectToUserProfile, currentAccount]);

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const ipfsLink = await uploadToIPFS(file);
        setProfilePicture(ipfsLink);
        toast.success('Profile Picture uploaded successfully!');
      } catch (error) {
        console.error('Error uploading profile picture to IPFS:', error);
        toast.error('Error uploading profile picture. Please try again.');
      }
    }
  };

  const handleProfileBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const ipfsLink = await uploadToIPFS(file);
        setProfileBanner(ipfsLink);
        toast.success('Profile Banner uploaded successfully!');
      } catch (error) {
        console.error('Error uploading profile banner to IPFS:', error);
        toast.error('Error uploading profile banner. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call createUser function with form data
      await createUser(name, email, profilePicture, profileBanner);

      // Log submitted data upon successful submission
      console.log('User created successfully:');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Profile Image:', profilePicture);
      console.log('Profile Banner:', profileBanner);

      // Reset form fields and error state
      setName('');
      setEmail('');
      setProfilePicture('');
      setProfileBanner('');
      setError(null);
    } catch (error) {
      // Handle error
      console.error('Error creating user:', error);
      setError('Error creating user. Please try again.');
    }
  };

  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />

      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />

      <label>
        Profile Picture:
        <input type="file" onChange={handleProfilePictureUpload} accept="image/*" />
      </label>
      <br />

      <label>
        Profile Banner:
        <input type="file" onChange={handleProfileBannerUpload} accept="image/*" />
      </label>
      <br />

      <button type="submit">Submit</button>

      <ToastContainer />
    </form>
  );
};

export default Login;
