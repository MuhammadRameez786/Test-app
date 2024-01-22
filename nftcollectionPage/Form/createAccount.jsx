import React, { useState, useContext } from 'react';
import { HiOutlineMail, HiUserCircle } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';
import Style from "../../AccountPage/Form/Form.module.css"

const createAccount = () => {
  const { createNFTCollection, connectToNFTCollection, createAccount, uploadToIPFS, } = useContext(NFTMarketplaceContext);

  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [banner, setBanner] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 'auto', // Adjust the width as needed
      backgroundColor: 'transparent',
      borderRadius: '10px', // Add border radius
      borderColor: '#ffeb3b', // Add border color (yellow)
      color: '#ffeb3b', // Add text color (yellow)
      '&:hover': {
        // Remove or adjust hover styles as needed
      },
    }),
    input: (provided) => ({
      ...provided,
      color: '#ffeb3b', // Add input text color (yellow)
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', // Set your desired background color
      
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#ffeb3b' : 'transparent', // Yellow background on hover
      color: state.isSelected ? '#ffeb3b' : state.isFocused ? 'black' : 'inherit',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#ffeb3b', // Add placeholder color (yellow)
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffeb3b', // Add color for the selected value (yellow)
    }),
  };

  const options = [
    { value: "Art", label: "Art" },
    { value: "Gaming", label: "Gaming" },
    { value: "PFPs", label: "PFPs" },
    { value: "Photography", label: "Photography" },
    { value: "Music", label: "Music" },
  ];
  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const ipfsLink = await uploadToIPFS(file);
        setPicture(ipfsLink);
        toast.success('Profile Picture uploaded successfully!');
      } catch (error) {
        console.error('Error uploading picture to IPFS:', error);
        toast.error('Error uploading picture. Please try again.');
      }
    }
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const ipfsLink = await uploadToIPFS(file);
        setBanner(ipfsLink);
        toast.success('Banner uploaded successfully!');
      } catch (error) {
        console.error('Error uploading banner to IPFS:', error);
        toast.error('Error uploadinge banner. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call createCollection function with form data
      await createNFTCollection(name, picture, banner, category);

      // Reset form fields
      setName('');
      setPicture('');
      setBanner('');
      setCategory('');

      console.log('NFT Collection created successfully!');
    } catch (error) {
      // Handle error
      console.error('Error creating NFT Collection:', error);
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
            <label htmlFor="picture-upload">Upload Image</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiUserCircle />
              </div>
              <input
                type="file"
                accept="image/*"
                id="picture-upload"
                onChange={handlePictureUpload}
              />
            </div>
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="banner-upload">Upload Banner</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiUserCircle />
              </div>
              <input
                type="file"
                accept="image/*"
                id="banner-upload"
                onChange={handleBannerUpload}
              />
            </div>
          </div>
          <div className={Style.customDropdown}>
            <label className={Style.dropdownLabel}>Category:</label>
            <Select
              className={Style.dropdownSelect}
              value={options.find((opt) => opt.value === category)}
              onChange={(selectedOption) => setCategory(selectedOption.value)}
              options={options}
              styles={customStyles} // Apply the custom styles
            />
          </div>
          <div className={Style.Form_box_btn}>
            <button className={Style.button} type="submit">Create</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default createAccount;