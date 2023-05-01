import { useState, useEffect } from "react";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import { contracts } from "../const/contracts";
import { getMerkleProof } from "util/merkle";

const useLiveMint = () => {
  console.log("contract address", contracts.LiveMint.address);
  const { address } = useAccount();
  console.log("my address", address)
  const [merkleProof, setMerkleProof] = useState(null);

  useEffect(() => {
    const fetchMerkleProof = async () => {
      console.log("lets go!", address)
      if (!address) return;
      try {
        const response = await fetch(`/api/merkle?address=${address}`);
        const data = await response.json();
        console.log("merkle proof", data.merkleProof);
        setMerkleProof(data.merkleProof);
      } catch (error) {
        console.error('Failed to fetch Merkle proof', error);
      }
    };
    
    fetchMerkleProof();
  }, [address]);

  const { config, error } = usePrepareContractWrite({
    address: contracts.LiveMint.address as `0x${string}`,
    abi: contracts.LiveMint.abi,
    functionName: "mint",
    args: [merkleProof],
  });

  if (error) {
    console.error(error);
  }

  return useContractWrite(config);
};

export default useLiveMint;
