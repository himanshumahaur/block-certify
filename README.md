# Block-Certify 📜🔗

Block-Certify is a Node.js application that leverages the MERN (MongoDB, Express.js, React.js, Node.js) stack and the power of blockchain to enable the issuance and verification of certificates. The application uses EJS for templating and integrates with the Ethereum blockchain through a smart contract written in Solidity. Certificates are efficiently stored using IPFS, with only the hash stored on the blockchain.

## Smart Contract 🧠💻

The smart contract is written in Solidity and deployed on the Goerli Ethereum testnet. It provides the foundation for certificate management on the blockchain.

```solidity
// Smart Contract Source Code
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.2;

contract Certification {
    // ...
}
```

## Tech Stack 🛠️

- **Frontend**: React.js, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Blockchain**: Ethereum (Goerli testnet)
- **Smart Contract Language**: Solidity
- **Storage**: IPFS
- **Wallet Integration**: Metamask

## Features 🚀

- **Issue Certificates**: Generate certificates by providing candidate information, organization name, course details, expiration date, and an IPFS link to the certificate PDF.

- **Verify Certificates**: Verify certificates using a unique certificate ID, obtaining information about the candidate, organization, course, expiration date, and the IPFS link.

- **Lock and Unlock Certificates**: Owner-controlled functionality for locking and unlocking certificates, enhancing privacy and control over certificate information.

- **Metamask Integration**: Secure transactions with Metamask as the wallet for signing operations, ensuring authentication and authorization.

- **Efficient Storage with IPFS**: Store only the hash of the certificate PDF on the blockchain while efficiently storing the full document on IPFS.

## Getting Started 🚦

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/block-certify.git
   ```

2. **Install Dependencies:**
   ```bash
   cd block-certify
   npm install
   ```

3. **Configure Metamask:**
   Set up Metamask and connect to the Goerli Ethereum testnet.

4. **Start the Application:**
   ```bash
   npm start
   ```

5. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing 🤝

Contributions are welcomed! Please check the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License 📄

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
