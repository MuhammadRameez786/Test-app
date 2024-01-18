// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTCollection {
    struct Collection {
        string name;
        string picture;
        string banner;
        string category; // Change the type from Category to string
    }

    mapping(address => Collection[]) private userCollections;
    Collection[] private allCollections;

    event CollectionCreated(address indexed owner, string name, string category);
    event CollectionUpdated(address indexed owner, uint256 index, string name, string category);
    event CollectionDeleted(address indexed owner, uint256 index);

    function createCollection(string memory _name, string memory _picture, string memory _banner, string memory _category) public {
        Collection memory newCollection = Collection({
            name: _name,
            picture: _picture,
            banner: _banner,
            category: _category
        });

        userCollections[msg.sender].push(newCollection);
        allCollections.push(newCollection);

        emit CollectionCreated(msg.sender, _name, _category);
    }

    function editCollection(uint256 index, string memory _name, string memory _picture, string memory _banner, string memory _category) public {
        require(index < userCollections[msg.sender].length, "Invalid collection index");

        userCollections[msg.sender][index].name = _name;
        userCollections[msg.sender][index].picture = _picture;
        userCollections[msg.sender][index].banner = _banner;
        userCollections[msg.sender][index].category = _category;

        allCollections[index] = userCollections[msg.sender][index];

        emit CollectionUpdated(msg.sender, index, _name, _category);
    }

    function getAllCollections() public view returns (Collection[] memory) {
        return allCollections;
    }

    function deleteCollection(uint256 index) public {
        require(index < userCollections[msg.sender].length, "Invalid collection index");

        emit CollectionDeleted(msg.sender, index);

        // Shift the last element to the deleted position and pop the last element
        uint256 lastIndex = userCollections[msg.sender].length - 1;
        userCollections[msg.sender][index] = userCollections[msg.sender][lastIndex];
        userCollections[msg.sender].pop();

        // Do the same for allCollections
        allCollections[index] = allCollections[lastIndex];
        allCollections.pop();
    }

    function getUserCollections() public view returns (Collection[] memory) {
        return userCollections[msg.sender];
    }
}
