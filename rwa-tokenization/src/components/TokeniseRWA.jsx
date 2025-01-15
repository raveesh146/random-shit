import React, { useState } from "react";
import { ethers } from "ethers";
// import RWAToken from "../contract/RWAToken.json";

const TokenizeRWA = ({ signer }) => {
  const [cid, setCid] = useState("");

  const mintToken = async () => {
    const contractAddress = "<DEPLOYED_CONTRACT_ADDRESS>";
    const contract = new ethers.Contract(contractAddress, RWAToken.abi, signer);

    try {
      const tx = await contract.mint(await signer.getAddress(), 1, `ipfs://${cid}`);
      await tx.wait();
      alert("Token minted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error minting token.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="IPFS CID"
        onChange={(e) => setCid(e.target.value)}
      />
      <button onClick={mintToken}>Mint Token</button>
    </div>
  );
};

export default TokenizeRWA;
