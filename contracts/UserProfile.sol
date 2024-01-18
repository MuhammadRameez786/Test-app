// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    
    struct User {
        string name;
        string email;
        string profilePicture;
        string profilebanner;
        uint256 lastUpdated;
    }
    
    mapping (address => User) private users;
    mapping (address => bool) private admins;
    
    event UserRegistered(address userAddress, string name, string email, string profilePicture, string profilebanner);
    event UserUpdated(address userAddress, string name, string email, string profilePicture, string profilebanner);
    
    constructor() {
        admins[msg.sender] = true;
    }
    
    modifier onlyAdmin() {
        require(admins[msg.sender] == true, "Only admins can call this function");
        _;
    }
    
    function registerUser(string memory _name, string memory _email, string memory _profilePicture, string memory _profilebanner) public {
        
        users[msg.sender] = User({
            name: _name,
            email: _email,
            profilePicture: _profilePicture,
            profilebanner: _profilebanner,
            lastUpdated: block.timestamp
        });
        emit UserRegistered(msg.sender, _name, _email, _profilePicture, _profilebanner);
    }
    
   function updateUser(string memory _name, string memory _email, string memory _profilePicture, string memory _profilebanner) public {
    // Update only the fields that are not empty
    if (bytes(_name).length > 0) {
        users[msg.sender].name = _name;
    }

    if (bytes(_email).length > 0) {
        users[msg.sender].email = _email;
    }

    if (bytes(_profilePicture).length > 0) {
        users[msg.sender].profilePicture = _profilePicture;
    }

    if (bytes(_profilebanner).length > 0) {
        users[msg.sender].profilebanner = _profilebanner;
    }

    emit UserUpdated(msg.sender, _name, _email, _profilePicture, _profilebanner);
}

    
    function getUser(address userAddress) public view returns (string memory name, string memory email, string memory profilePicture, string memory profilebanner) {
        return (users[userAddress].name, users[userAddress].email, users[userAddress].profilePicture, users[userAddress].profilebanner);
    }
    
    function promoteAdmin(address adminAddress) public onlyAdmin {
        admins[adminAddress] = true;
    }
    
    function demoteAdmin(address adminAddress) public onlyAdmin {
        require(msg.sender != adminAddress, "Cannot demote self");
        admins[adminAddress] = false;
    }
}
