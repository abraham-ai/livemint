import React from "react";
import useMints from "../hooks/useMints";

const LiveMint = () => {
  const { mints, error, isLoading } = useMints();

  return (
    <>
      <h1>Mints</h1>
      <div>
        {mints?.map((mint: any) => (
          <div key={mint._id} style={{margin: 20}}>
            <img src={mint.imageUri} width="300" />
          </div>
        ))}
      </div>
    </>
  );
};

export default LiveMint;
