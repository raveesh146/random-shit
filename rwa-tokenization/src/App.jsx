import React, { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import UploadMetadata from "./components/UploadMetadata";
import TokenizeRWA from "./components/TokeniseRWA";

const App = () => {
  const [signer, setSigner] = useState(null);
  const [cid, setCid] = useState("");

  return (
    <div>
      <h1>RWA Tokenisatn</h1>
      <ConnectWallet onWalletConnected={(provider, signer) => setSigner(signer)} />
      {signer && (
        <>
          <UploadMetadata onMetadataUploaded={(cid) => setCid(cid)} />
          {cid && <TokenizeRWA signer={signer} />}
        </>
      )}
    </div>
  );
};

export default App;
