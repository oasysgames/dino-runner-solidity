// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import 'base64-sol/base64.sol';
import "hardhat/console.sol";

contract DinoRunner is ERC721, Ownable {
    uint256 public tokenIndex = 0;

    constructor() ERC721("Dino Runner", "DNR") {
    }

    function mint(address _to) public onlyOwner() {
        console.log("IN MINT!");
        console.log(_to);
        _mint(_to, tokenIndex);
        tokenIndex++;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token with this id doesn't exist");
        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"',
                                'Dino #',
                                Strings.toString(tokenId),
                                '",',
                                '"image":"',
                                'https://raw.githubusercontent.com/oasysgames/dino-runner-client/blob/main/src/assets/images/dinos/pixelDinoMonochromeSingleFrame.png',
                            '"}'
                        )
                    )
                )
            )
        );
    }
}