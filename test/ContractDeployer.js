const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  

describe("ContractDeployer", function () {
  async function deployContractDeployerFixture() {
    const [deployer] = await ethers.getSigners();
    
    const ContractDeployerFactory = await ethers.getContractFactory("ContractDeployer");
    const contractDeployer = await ContractDeployerFactory.deploy();

    return { contractDeployer, deployer };
  }

  describe("Deployment", function () {
    it("Should deploy another instance of ContractDeployer using ContractDeployer", async function () {
      const { contractDeployer, deployer } = await loadFixture(deployContractDeployerFixture);

      // Obtain the bytecode for ContractDeployer
      const ContractDeployerFactory = await ethers.getContractFactory("ContractDeployer");
      const contractDeployerBytecode = ContractDeployerFactory.bytecode;


      // Deploy another instance of ContractDeployer using the first instance
      const deployTx = await contractDeployer.deployFromBytecode(contractDeployerBytecode);
      const receipt = await deployTx.wait();


        // Extract the address of the newly deployed contract from the event
        const newContractAddressEvent = receipt.events.find(event => event.event === "ContractDeployed");
        const newContractAddress = newContractAddressEvent.args.newContractAddress;

        console.log("Newly deployed contract address:", newContractAddress);


    });
  });

  // Additional tests for ContractDeployer functionality could follow...
});
