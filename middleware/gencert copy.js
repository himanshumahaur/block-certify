const { Web3 } = require('web3');

// Replace with your Ganache provider URL
const ganacheProvider = 'https://restless-patient-road.ethereum-goerli.quiknode.pro/345bf8c34e06672eb29ca97bd5c4790b6f65f6ef/'; // Example URL

// Contract ABI (copy this from your Solidity contract compilation output or use a tool like truffle)
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"_certificateId","type":"bytes32"}],"name":"certificateGenerated","type":"event"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"certificates","outputs":[{"internalType":"string","name":"candidate_name","type":"string"},{"internalType":"string","name":"org_name","type":"string"},{"internalType":"string","name":"course_name","type":"string"},{"internalType":"uint256","name":"expiration_date","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_id","type":"string"},{"internalType":"string","name":"_candidate_name","type":"string"},{"internalType":"string","name":"_org_name","type":"string"},{"internalType":"string","name":"_course_name","type":"string"},{"internalType":"uint256","name":"_expiration_date","type":"uint256"}],"name":"generateCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_id","type":"string"}],"name":"getData","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

// Replace with the deployed contract address
const contractAddress = '0xa3812D892193Dd251c78f4Ab017DF7A2f5cfD1F9';

// Replace with the private key of your account
// const privateKey = '0x11a51baecc7e3733e11b672c7cd342c5544eab164fef0927ac9c45d4a06f1255';

// Initialize web3 with Ganache provider
const web3 = new Web3(ganacheProvider);

// Contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Account information
// const account = web3.eth.accounts.privateKeyToAccount(privateKey);
// const accout = web3.eth.accounts.wallet.add(privateKey);
// web3.eth.accounts.wallet.add(account);
// web3.eth.defaultAccount = account.address;

// Interacting with the contract
// async function interactWithContract() {
//     // Get the current string value
//     const currentString = await contract.methods.getString().call();
//     console.log('Current String:', currentString);

//     // Set a new string value
//     const newString = "Hello, My World!";
//     await contract.methods.setString(newString).send({ from: account.address });

//     // Get the updated string value
//     const updatedString = await contract.methods.getString().call();
//     console.log('Updated String:', updatedString);
// }

// Run the function to interact with the contract
// interactWithContract().catch(console.error);

// var tx = {
//     gas: gasLimit,
//     to: publicKey,
//     data: encoded
// }

// async function getCer() {
//     const cer = await contract.methods.getData('0x3132306373303030370000000000000000000000000000000000000000000000').call();
//     console.log(cer);
// }

// web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
//     web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
// })

// getCer();

async function getCer() {
    var encoded = contract.methods.generateCertificate("120cs0002", "Baby", "Bhavishya", "DX", 124421).encodeABI();
    var block = await web3.eth.getBlock("latest");
    var gasLimit = Math.round(Number(block.gasLimit / BigInt(block.transactions.length)));

    var tx = {
        from: '0x56a7bfEd1FeFC2282434cC77472E5aF0c94aBb9A',
        gasPrice: 2000000,
        to: '0xa3812D892193Dd251c78f4Ab017DF7A2f5cfD1F9',
        data: encoded
    }

    web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
    })
}

// getCer();

var encoded = contract.methods.generateCertificate("120cs0002", "Baby", "Bhavishya", "DX", 124421).encodeABI();
console.log(encoded);

// contract.methods.generateCertificate("ID", "CandidateName", "OrgName", "CourseName", 1234567890)
//     .send({ from: account.address, gas: 3000000 })
//     .then((receipt) => {
//         console.log('Certificate generated:', receipt);
//     })
//     .catch((error) => {
//         console.error('Error generating certificate:', error);
//     });

// contract.methods.getData('0x3132306373303030370000000000000000000000000000000000000000000000')
//     .call()
//     .then((result) => {
//         console.log('Certificate data:', result);
//     })
//     .catch((error) => {
//         console.error('Error fetching certificate data:', error);
//     });