// async function main() {
//    // Grab the contract factory
//    const MyNFT = await ethers.getContractFactory("MyNFT");

//    // Start deployment, returning a promise that resolves to a contract object
//    const myNFT = await MyNFT.deploy(); // Instance of the contract
//    console.log("Contract deployed to address:", myNFT.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch(error => {
//     console.error(error);
//     process.exit(1);
//   });

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = 80;

async function main(name, owner, metadatauri) {
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const mynftdeploy = await MyNFT.deploy(name, "HarryKwanTesting");
  await mynftdeploy.deployed();
  await mynftdeploy.mintNFT(owner, metadatauri);

  return mynftdeploy;
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/mint", async (req, res) => {
  try {
    console.log(req.body);
    const mintresult = await main(
      req.body.name,
      req.body.owner,
      req.body.metadatauri
    );
    // console.log(mintresult);
    res.send({
      // body: mintresult,
      address: mintresult.address,
      message: "success",
    });
    // process.exit(0);
  } catch (e) {
    console.log(e);
    res.send(e);
    // process.exit(1);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
