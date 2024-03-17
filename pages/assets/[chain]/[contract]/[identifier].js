import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, Category, Brand } from "../../../../components/componentsindex";
import NFTDetailsPage from "../../../../NFTDetailsPage/NFTDetailsPage";


const AssetDetailPage = () => {
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  return (
    <div>
      <NFTDetailsPage nft={nft} />
      <Category />
      <Brand />
    </div>
  );
 
//   const router = useRouter();
//   const { chain, contract, identifier, price } = router.query;
//   //console.log(chain, contract, identifier, price);
//   const [collectionDetails, setCollectionDetails] = useState(null);
//   const [currentPriceInEther, setCurrentPriceInEther] = useState(null);
//   const [collectionName, setCollectionName] = useState(null);
//   const [collectionImage, setCollectionImage] = useState(null);

//   useEffect(() => {
//     const fetchCollectionDetails = async () => {
//       try {
//         const options = {
//           method: 'GET',
//           headers: { accept: 'application/json', 'x-api-key': 'd2bf62d65405477ba45c17e9ca7cc7f5' }
//         };
//         const nftResponse = await fetch(`https://api.opensea.io/api/v2/chain/${chain}/contract/${contract}/nfts/${identifier}`, options);
//         const nftData = await nftResponse.json();
//         //console.log("nft detail:", nftData);
        
//         const collectionResponse = await fetch(`https://api.opensea.io/api/v2/collections/${nftData.nft.collection}`, options);
//         const collectionData = await collectionResponse.json();
//         console.log("collection details:", collectionData);

//         const listingResponse = await fetch(`https://api.opensea.io//api/v2/orders/${chain}/seaport/listings?asset_contract_address=${contract}&token_ids=${identifier}`, options);
//         const listingData = await listingResponse.json();
//         //console.log("Collection", listingData);

//         const nftcontract = nftData.nft.contract;
//         const description = nftData.nft.description;
//         const image_url = nftData.nft.image_url;
//         const name = nftData.nft.name;
//         const updated_at = nftData.nft.updated_at;
//         const opensea_url = nftData.nft.opensea_url;

//         console.log("Contract:", nftcontract);
//         console.log("Description:", description);
//         console.log("Image URL:", image_url);
//         console.log("Name:", name);
//         console.log("Updated At:", updated_at);
//         console.log("OpenSea URL:", opensea_url);


//         const collectionName = collectionData.name;
//         const collectionImage = collectionData.image_url
//         console.log("Collection Name:", collectionName);

//         const currentPriceInWei = listingData.orders[0].current_price;
//         const currentPriceInEther = currentPriceInWei / 10 ** 18;
//         console.log("Current Price in Ether:", currentPriceInEther);
        
//         setCurrentPriceInEther(listingData.orders[0].current_price / 10 ** 18);
//         setCollectionName(collectionData.name);
//         setCollectionImage(collectionData.image_url);
//         setCollectionDetails(nftData);
//       } catch (error) {
//         console.error('Error fetching collection details:', error);
//       }
//     };

//     if (chain && contract && identifier) {
//       fetchCollectionDetails();
//     }
//   }, [chain, contract, identifier]);

//   if (!collectionDetails) {
//     return <div>Loading...</div>;
//   }
//   const { nft } = collectionDetails;

//   return (
//     <div>
//       <h1>Asset Details</h1>
//       <p>Contract: {collectionDetails.nft.contract}</p>
//       <p>Description: {collectionDetails.nft.description}</p>
//       <p>Image URL: {collectionDetails.nft.image_url}</p>
//       <p>Name: {collectionDetails.nft.name}</p>
//       <p>Updated At: {collectionDetails.nft.updated_at}</p>
//       <p>OpenSea URL: {collectionDetails.nft.opensea_url}</p>
//       <p>Collection Name: {collectionName}</p>
//       <p>Collection Image: {collectionImage}</p>
//       <p>Current Price in Ether: {currentPriceInEther}</p>
//       <p>Chain: {chain}</p>
//       <p>Contract: {contract}</p>
//       <p>Identifier: {identifier}</p>
//     </div>
//   );

};

export default AssetDetailPage;