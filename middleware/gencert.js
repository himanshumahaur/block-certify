var fs = require("fs");
var ipfsAPI = require("ipfs-api");

const { Web3 } = require("web3");

// const ganacheProvider = "https://restless-patient-road.ethereum-goerli.quiknode.pro/345bf8c34e06672eb29ca97bd5c4790b6f65f6ef/";
const ganacheProvider = "https://eth-goerli.g.alchemy.com/v2/cfbUDSufA1S_3ALxIpYfGx6BNgWyJBbv";
const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"_certificateId","type":"bytes32"}],"name":"certificateGenerated","type":"event"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"certificates","outputs":[{"internalType":"string","name":"candidate_name","type":"string"},{"internalType":"string","name":"org_name","type":"string"},{"internalType":"string","name":"course_name","type":"string"},{"internalType":"uint256","name":"expiration_date","type":"uint256"},{"internalType":"string","name":"ipfsLink","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_id","type":"string"},{"internalType":"string","name":"_candidate_name","type":"string"},{"internalType":"string","name":"_org_name","type":"string"},{"internalType":"string","name":"_course_name","type":"string"},{"internalType":"uint256","name":"_expiration_date","type":"uint256"},{"internalType":"string","name":"_ipfsLink","type":"string"}],"name":"generateCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_id","type":"string"}],"name":"getData","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];

const contractAddress = "0x9b1Ece76339ED92b255cf83Cb277e2aB8567bDf2";

const web3 = new Web3(ganacheProvider);
const contract = new web3.eth.Contract(abi, contractAddress);

var ipfs = ipfsAPI("/ip4/127.0.0.1/tcp/5001");

const getEncoded = (req, res, ipfsHash) => {
  const { _id, _c_name, _org_name, _cert_name, _exp_date } = req.body;
  console.log(ipfsHash);
  const encoded = contract.methods
    .generateCertificate(_id, _c_name, _org_name, _cert_name, _exp_date, ipfsHash)
    .encodeABI();
  return encoded;
};

const getData = (req, res) => {
  return new Promise((resolve, reject) => {
    const { _id } = req.body;
    const result = contract.methods.certificates(_id).call();
    resolve(result);
  })
}

const saveIPFS =  (req, res, pdfPath) => {
    return new Promise((resolve,reject) => {
        var data = fs.readFileSync(pdfPath);
        ipfs.files.add(data, (err, res) => {
        if (err) {
            console.log("IPFS save failed!");
            return;
        }
        resolve(res[0].hash);
    });
    })
};

const readIPFS = (req, res) => {
  const { ipfsLink } = req.body;
  console.log(ipfsLink)
  return new Promise((resolve, reject) => {
    ipfs.files.get(ipfsLink, (err, res) => {
      if (err) {
        console.log("IPFS read failed!");
        return;
      }
      resolve(res[0].content);
    })
  });  
};


module.exports = { getEncoded, getData, saveIPFS, readIPFS };