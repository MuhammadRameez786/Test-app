import React, { useState, useEffect, useContext } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import Select from "react-select";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
import { DropZone } from "../UploadNFT/uploadNFTIndex.js";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const UloadNFT = ({ uploadToIPFS, createNFT }) => {
  const { currentAccount, getUserCollections, } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const [nftData, setNftData] = useState(null);
  const [userCollections, setUserCollections] = useState([]);
  const [sellers, setSellers] = useState([]);
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '400px', // Adjust the width as needed
      backgroundColor: '#232325',
      borderRadius: '10px', // Add border radius
      borderColor: '#ffeb3b', // Add border color (yellow)
      color: '#ffeb3b', // Add text color (yellow)
      '&:hover': {
        borderRadius: '10px',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: '#ffeb3b', // Add input text color (yellow)
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#232325', // Set your desired background color
      
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#ffeb3b' : 'transparent', // Yellow background on hover
      color: state.isSelected ? '#ffeb3b' : state.isFocused ? 'black' : 'inherit',
      borderRadius: '10px',
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

  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userCollections = await getUserCollections(currentAccount);
        setNftData(userCollections);
        setUserCollections(userCollections || []);
        console.log("collections:", userCollections);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [getUserCollections, currentAccount]);

  const handleCreateNFT = async () => {
    console.log("Inside handleCreateNFT - collectionName:", collectionName);
    createNFT(
      name,
      price,
      image,
      description,
      router,
      website,
      royalties,
      fileSize,
      collectionName, // Now you can directly pass collectionName here
    );
  };
  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        name={name}
        website={website}
        description={description}
        royalties={royalties}
        fileSize={fileSize}
        collectionName={collectionName}
        properties={properties}
        setImage={setImage}
        uploadToIPFS={uploadToIPFS}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Item Name</label>
          <input
            type="text"
            placeholder="NFT Name"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="website">Website</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>

            <input
              type="text"
              placeholder="website"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <p className={Style.upload_box_input_para}>
            Ciscrypt will include a link to this URL on this item's detail page,
            so that users can click to learn more about it. You are welcome to
            link to your own webpage with more details.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Choose collection</label>
          <p className={Style.upload_box_input_para}>
            Choose an existing collection or create a new one
          </p>
          <div className={Style.upload_box_slider_div}>
            <Select
              options={userCollections.map((collection) => ({
                value: collection.name,
                label: collection.name,
                picture: collection.picture,
              }))}
              defaultValue={userCollections.find((collection) => collection.name === collectionName)}
              onChange={(selectedOption) => {
                console.log("Selected Option:", selectedOption);
                setCollectionName(selectedOption ? selectedOption.value : "");
              }}
              placeholder="Select a Collection"
              styles={customStyles}
            />
          </div>
        </div>
        <div className={formStyle.Form_box_input_social}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Royalties">Royalties</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder="20%"
                onChange={(e) => setRoyalties(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="size">Size</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>
              <input
                type="text"
                placeholder="165MB"
                onChange={(e) => setFileSize(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Propertie">Propertie</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Propertie"
                onChange={(e) => setProperties(e.target.value)}
              />
            </div>
          </div>

          <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">Price</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick={handleCreateNFT} // Use the updated function
            classStyle={Style.upload_box_btn_style}
          />
          <Button
            btnName="Preview"
            handleClick={() => {}}
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default UloadNFT;
