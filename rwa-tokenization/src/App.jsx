import React, { useState } from "react";
import ConnectWallet from "./components/connectWallet";
import UploadMetadata from "./components/UploadMetadata";
import TokenizeRWA from "./components/TokeniseRWA";

const App = () => {
  const [signer, setSigner] = useState(null);
  const [metadataCid, setMetadataCid] = useState("");

  return (
    <div>
      <h1>RWA Tokenization</h1>
      <ConnectWallet onWalletConnected={(provider, signer) => setSigner(signer)} />
      {signer && (
        <>
          {/* <UploadMetadata onMetadataUploaded={(cid) => setMetadataCid(cid)} />
          {metadataCid && <TokenizeRWA signer={signer} />} */}
        </>
      )}
    </div>
  );
};

export default App;
