const { expect } = require("chai");
const { ethers } = require("hardhat");

let deployer
ethers.getSigners().then((signers) => {
  deployer = signers[0]
})

const firstTokenId = 0

describe("DinoRunner", function () {
  it("Should be able to mint an nft and read its tokenURI", async function () {
    const DinoRunner = await ethers.getContractFactory("DinoRunner");
    const dinoRunner = await DinoRunner.deploy();
    await dinoRunner.deployed();

    // Mint nft and check ownership
    const mintTokenTx = await dinoRunner.mint(deployer.address);
    await mintTokenTx.wait();
    expect(await dinoRunner.ownerOf(firstTokenId)).to.equal(deployer.address);
    console.log(`The owner of token ${firstTokenId} is ${deployer.address}`)

    // Check tokenURI
    const tokenURI = await dinoRunner.tokenURI(firstTokenId);
    expect(tokenURI).to.be.ok;
    console.log(`TokenURI: ${tokenURI}`)
  });
});
