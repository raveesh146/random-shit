import React, { useState } from "react";
import { create } from "ipfs-http-client";

const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

const UploadMetadata = ({ onMetadataUploaded }) => {
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    image: "",
    attributes: [],
  });

  const handleUpload = async () => {
    const result = await ipfs.add(JSON.stringify(metadata));
    const cid = result.path;
    onMetadataUploaded(cid);
    alert(`Metadata uploaded to IPFS: ipfs://${cid}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) =>
          setMetadata({ ...metadata, description: e.target.value })
        }
      />
      <button onClick={handleUpload}>Upload Metadata</button>
    </div>
  );
};

export default UploadMetadata;
