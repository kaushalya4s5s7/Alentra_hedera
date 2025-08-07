// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const blp = await ethers.getContractFactory("SecureTransfer");
    const bp = await blp.deploy(/* constructor args */);

    // For newer ethers versions (v6+)
    await bp.waitForDeployment();
    console.log("Bulk Transfer deployed to:", await bp.getAddress());
}

// Execute the main function and handle errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
