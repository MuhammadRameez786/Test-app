// import React, { useState, useEffect, useContext } from "react";
// import Style from "./Form.module.css";
// import { useRouter } from "next/router";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { HiOutlineMail, HiUserCircle } from "react-icons/hi";

// import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';

// const Form = () => {
// const { updateUser, currentAccount, uploadToIPFS, connectToUserProfile, } = useContext(NFTMarketplaceContext); 
// const [name, setName] = useState('');
// const [email, setEmail] = useState('');
// const [profilePicture, setProfilePicture] = useState('');
// const [profileBanner, setProfileBanner] = useState('');

// const [error, setError] = useState(null);
  

// const handleProfilePictureUpload = async (e) => {
//   e.preventDefault();
//   const file = e.target.files[0];
//   if (file) {
//     try {
//       const ipfsLink = await uploadToIPFS(file);
//       setProfilePicture(ipfsLink);
//       toast.success('Profile Picture uploaded successfully!');
//     } catch (error) {
//       console.error('Error uploading profile picture to IPFS:', error);
//       toast.error('Error uploading profile picture. Please try again.');
//     }
//   }
// };

// const handleProfileBannerUpload = async (e) => {
//   e.preventDefault();
//   const file = e.target.files[0];
//   if (file) {
//     try {
//       const ipfsLink = await uploadToIPFS(file);
//       setProfileBanner(ipfsLink);
//       toast.success('Profile Banner uploaded successfully!');
//     } catch (error) {
//       console.error('Error uploading profile banner to IPFS:', error);
//       toast.error('Error uploading profile banner. Please try again.');
//     }
//   }
// };

// useEffect(() => {
//   // Handle client-side updates, if necessary
// }, [profilePicture, profileBanner]);

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     //Call updateUser function with form data
//     await updateUser(name, email, profilePicture, profileBanner);

//     // Log submitted data upon successful submission
//     console.log('User updated successfully:');
//     console.log('Name:', name);
//     console.log('Email:', email);
//     console.log('Profile Picture URI:', profilePicture);
//     console.log('Profile Banner URI:', profileBanner);

//     // Reset form fields and error state
//     setName('');
//     setEmail('');
//     setProfilePicture('');
//     setProfileBanner('');
//     setError(null);

//   } catch (error) {
//     // Handle error
//     console.error('Error updating user:', error);
//     setError('Error updating user. Please try again.');
//   }
// };

//   return (
{/* <div className={Style.Form}>
  <div className={Style.Form_box}>
    <form>
      <div className={Style.Form_box_input}>
        <label htmlFor="profile-picture-upload">Upload Image</label>
        <div className={Style.Form_box_input_box}>
          <div className={Style.Form_box_input_box_icon}>
            <HiUserCircle />
          </div>
          <input
            type="file"
            accept="image/*"
            id="profile-picture-upload"
            onChange={handleProfilePictureUpload}
          />
        </div>
      </div>
      <div className={Style.Form_box_input}>
        <label htmlFor="profile-banner-upload">Upload Banner</label>
        <div className={Style.Form_box_input_box}>
          <div className={Style.Form_box_input_box_icon}>
            <HiUserCircle />
          </div>
          <input
            type="file"
            accept="image/*"
            id="profile-banner-upload"
            onChange={handleProfileBannerUpload}
          />
        </div>
      </div>
      <div className={Style.Form_box_input}>
        <label htmlFor="name">Name</label>
        <div className={Style.Form_box_input_box}>
          <div className={Style.Form_box_input_box_icon}>
            <HiUserCircle />
          </div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className={Style.Form_box_input}>
        <label htmlFor="email">Email</label>
        <div className={Style.Form_box_input_box}>
          <div className={Style.Form_box_input_box_icon}>
            <HiOutlineMail />
          </div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className={Style.Form_box_btn}>
        <button type="submit" className={Style.button}>
          Submit
        </button>
      </div>
    </form>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </div>
</div> */}
//   );
// };

//  export default Form;

import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlineMail, HiUserCircle } from "react-icons/hi";

import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';
import Style from "./Form.module.css";

const Form = () => {
  const { updateUser, currentAccount, uploadToIPFS, connectToUserProfile, } = useContext(NFTMarketplaceContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [profileBanner, setProfileBanner] = useState('');
  const [error, setError] = useState(null);

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
      // Check if required context values are available
      if (!updateUser || !currentAccount) {
        throw new Error('Context values are missing.');
      }

      // Check if form fields are empty
      // if (!name || !email || !profilePicture || !profileBanner) {
      //   throw new Error('Please fill in all fields.');
      // }

      // Call updateUser function with form data
      await updateUser(name, email, profilePicture, profileBanner);

      // Log submitted data upon successful submission
      console.log('User updated successfully:');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Profile Picture URI:', profilePicture);
      console.log('Profile Banner URI:', profileBanner);

      // Reset form fields and error state
      setName('');
      setEmail('');
      setProfilePicture('');
      setProfileBanner('');
      setError(null);

    } catch (error) {
      // Handle error
      console.error('Error updating user:', error);
      setError('Error updating user. Please try again.');
    }
  };

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form onSubmit={handleSubmit}>
        <div className={Style.Form_box_input}>
        <label htmlFor="name">Name</label>
        <div className={Style.Form_box_input_box}>
          <div className={Style.Form_box_input_box_icon}>
            <HiUserCircle />
          </div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className={Style.Form_box_input}>
        <label htmlFor="email">Email</label>
        <div className={Style.Form_box_input_box}>
          <div className={Style.Form_box_input_box_icon}>
            <HiOutlineMail />
          </div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
          <br />

          <div className={Style.Form_box_input}>
        <label htmlFor="profile-picture-upload">Upload Image</label>
        <div className={Style.Form_box_input_box}>
          <div className={Style.Form_box_input_box_icon}>
            <HiUserCircle />
          </div>
          <input
            type="file"
            accept="image/*"
            id="profile-picture-upload"
            onChange={handleProfilePictureUpload}
          />
        </div>
      </div>

          <div className={Style.Form_box_input}>
        <label htmlFor="profile-banner-upload">Upload Banner</label>
        <div className={Style.Form_box_input_box}>
          <div className={Style.Form_box_input_box_icon}>
            <HiUserCircle />
          </div>
          <input
            type="file"
            accept="image/*"
            id="profile-banner-upload"
            onChange={handleProfileBannerUpload}
          />
        </div>
      </div>
          <div className={Style.Form_box_btn}>
            <button className={Style.button} type="submit">Update User</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Form;
