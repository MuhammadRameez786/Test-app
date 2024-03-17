// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// const CreatorPage = () => {
//     const router = useRouter();
//     const { creatorName } = router.query;

//     useEffect(() => {
//         // Extract creatorName from the URL path
//         const { creator } = router.query;
//         if (creator) {
//             console.log('Fetching asset details for', creator);
//             // Perform any necessary data fetching based on the creatorName
//         }
//     }, [router.query]);

//     return (
//         <div>
//             <h1>Asset Details</h1>
//             <p>Name: {creatorName}</p>
//         </div>
//     );
// }

//export default CreatorPage;
//////////////////////////////////////////

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const CreatorPage = () => {
    const [creatorName, setCreatorName] = useState(null);
    const [creatorImage, setCreatorImage] = useState(null);
    const [creatorBanner, setCreatorBanner] = useState(null);
    const [ownerAddress, setOwnerAddress] = useState(null);
    const router = useRouter();
    console.log('Router query:', router.query);
    const { creator: creatorAddress } = router.query;
  
    useEffect(() => {
      const fetchCollectionDetails = async () => {
        try {
          const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
          };
          const creatorResponse = await fetch(`https://api.opensea.io/api/v2/accounts/${creatorAddress}`, options);
          const creatorData = await creatorResponse.json();
          console.log("Creator", creatorData)
  
          const fetchedCreatorAddress = creatorData.address;
          const fetchedCreatorName = creatorData.username;
          const fetchedCreatorImage = creatorData.profile_image_url;
          const fetchedCreatorBanner = creatorData.banner_image_url;
  
          setCreatorName(fetchedCreatorName);
          setCreatorImage(fetchedCreatorImage);
          setCreatorBanner(fetchedCreatorBanner);
          setOwnerAddress(fetchedCreatorAddress);
        } catch (error) {
          console.error('Error fetching collection details:', error);
        }
      };
  
      if (creatorAddress) {
        fetchCollectionDetails();
      }
    }, [creatorAddress]);
  
    useEffect(() => {
      if (creatorAddress) {
        console.log('Fetching asset details for', creatorAddress);
        // Perform any necessary data fetching based on the creatorName
      }
    }, [creatorAddress]);
  
    return (
      <div>
        <h1>Asset Details</h1>
        <p>Name: {creatorName}</p>
        <p>Address: {creatorAddress }</p>
      </div>
    );
  };

export default CreatorPage;

////////////////////////////////////////////////
