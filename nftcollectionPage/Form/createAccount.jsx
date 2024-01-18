// import React, { useEffect, useState, useContext } from 'react';
// import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { HiOutlineMail } from "react-icons/hi";
// import { EventSourcePolyfill } from 'event-source-polyfill';

// import Style from "./createAccount.module.css";

// const createAccount = () => {
//   const [name, setName] = useState('');
//   const [collectionDescription, setCollectionDescription] = useState('');
//   const [collectionImage, setcollectionImage] = useState("https://res.cloudinary.com/dmesqweam/image/upload/v1680896111/images_7_ttxx6q.jpg");
//   const [category, setCategory] = useState('');
//   const { currentAccount } = useContext(NFTMarketplaceContext);
//   const [seller, setSeller] = useState('');
//   const [imageMessage, setImageMessage] = useState();
//   const [nfts, setNFTs] = useState([]);

//   useEffect(() => {
//     const eventSource = new EventSource('https://testapi.thedaygalpuclub.com/api/v1/collection');

//     eventSource.addEventListener('nftCollection', (event) => {
//     const data = JSON.parse(event.data);
//     const { arts, music, photography } = data;
//     });

//   }, []);

//   const postDetails = (collectionImages) => {
//     setImageMessage(null);
//     if (collectionImages.type === "image/jpeg" || collectionImages.type === "image/png") {
//       const data = new FormData();
//       data.append("file", collectionImages);
//       data.append("upload_preset", "pba5hgyo");
//       data.append("cloud_name", "dmesqweam");
//       fetch("https://api.cloudinary.com/v1_1/dmesqweam/image/upload", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setcollectionImage(data.url.toString());
//           console.log(collectionImage);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       return setImageMessage("Please Select an Image");
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const data = {
//       name,
//       collectionDescription,
//       category,
//       collectionImage,
//       seller: currentAccount,
//     };
  
//     try {
//         const response = await fetch("https://testapi.thedaygalpuclub.com/api/v1/collection", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//         const responseData = await response.json();
      
//         if (response.status === 201) {
//             toast.success("Collection Created successfully.", {
//               position: "top-center",
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "dark",
//             });
//           } else {
//             toast.error(`Error creating collection: ${responseData.error.errors.name.message}`, {
//               position: "top-center",
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "dark",
//             });
//           }
      
//       } catch (error) {
//     }      
//   };


//   return (
//     <div className={Style.Form}>
//         <div className={Style.Form_box}>
//         <div className={Style.account_box_img}>
//             <img
//               src={collectionImage}
//               alt="profile Image"
//               width={150}
//               height={150}
//               className={Style.account_box_img_img}
//             />
//         </div>
//             <form onSubmit={handleSubmit}>
//                 <div className={Style.Form_box_image}>
//                     <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>Upload Image</label>
//                         <input
//                         type="file"
//                         accept="image/*"
//                         id="image-upload"
//                         style={{ display: "none" }}
//                         onChange={(e) => postDetails(e.target.files[0])}
//                         />
            
//                     {imageMessage && <p className="error">{imageMessage}</p>}
//                 </div>
//                 <div className={Style.Form_box_input}>
//                 <label htmlFor="name">Collection Name:</label>
//                     <div className={Style.Form_box_input_box}>
//                         <div className={Style.Form_box_input_box_icon}>
//                             <HiOutlineMail />
//                         </div>
//                         <input
//                             type="name"
//                             id="name"
//                             name="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className={Style.Form_box_input}>
//                 <label htmlFor="description">Collection Description:</label>
//                 <textarea
//                     id="description"
//                     name="description"
//                     value={collectionDescription}
//                     onChange={(e) => setCollectionDescription(e.target.value)}
//                 />
//                 </div>
//                 <div className={Style.Form_box_input}>
//                 <label htmlFor="name">Select a category:</label>
//                 <div className={Style.Form_box_input_box}>
//                     <select value={category} onChange={(e) => setCategory(e.target.value)}>
//                         <option value="Arts">Arts</option>
//                         <option value="Music">Music</option>
//                         <option value="Photography">Photography</option>
//                     </select>
//                     </div>
//                 </div>
//                 <div className={Style.Form_box_input}>
//                 <label htmlFor="currentAccount">Wallet Address:</label>
//                     <div className={Style.Form_box_input_box}>
//                         <div className={Style.Form_box_input_box_icon}>
//                             <HiOutlineMail />
//                         </div>
//                     <input
//                         type="text"
//                         id="currentAccount"
//                         name="currentAccount"
//                         value={currentAccount}
//                         disabled={true}
//                         onChange={(e) => setSeller(e.target.value)}
//                     />
//                     </div>
//                 </div >
//                 <div className={Style.Form_box_btn}>
//                 <button type="submit" className={Style.button}>Create Collection</button>
//                 </div>
//             </form>
//             <ToastContainer
//             position="top-center"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="dark"
//           />
//         </div>
//     </div>
//   );
// }

// export default createAccount;

import React, { useState, useContext } from 'react';
import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';

const createAccount = () => {
  const { createNFTCollection, connectToNFTCollection, createAccount } = useContext(NFTMarketplaceContext);

  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [banner, setBanner] = useState('');
  const [category, setCategory] = useState('');

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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />

      <label>
        Picture URL:
        <input type="text" value={picture} onChange={(e) => setPicture(e.target.value)} />
      </label>
      <br />

      <label>
        Banner URL:
        <input type="text" value={banner} onChange={(e) => setBanner(e.target.value)} />
      </label>
      <br />

      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Art">Art</option>
          <option value="Gaming">Gaming</option>
          <option value="PFPs">PFPs</option>
          <option value="Photography">Photography</option>
          <option value="Music">Music</option>
        </select>
      </label>
      <br />

      <button type="submit">Create NFT Collection</button>
    </form>
  );
};

export default createAccount;