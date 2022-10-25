const hre = require("hardhat");

// Type your own PUBLIC key in here
const recipientAddress = ''

async function main() {
  const DinoRunner = await hre.ethers.getContractFactory("DinoRunner");
  const dinoRunner = await DinoRunner.deploy();

  await dinoRunner.deployed();
  console.log("Dino Runner contract deployed to:", dinoRunner.address);

  const mintTokenTx = await dinoRunner.mint(recipientAddress);
  await mintTokenTx.wait();
  console.log(`Minted token to ${recipientAddress}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
