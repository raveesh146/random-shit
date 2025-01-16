import React, { useState } from "react";
import { create } from "ipfs-http-client";

const projectId = "2435897144b8412eb5ae71d42bce7b13";    // Your Infura Project ID
const projectSecret = "mp24nHxgjakZnkrFi5qdCV3hdATPhX5ThSGbcpANQIVvLnakNEcH9A";  // Your Infura Secret
const auth = 'Basic ' + btoa(projectId + ':' + projectSecret);

const ipfs = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization: auth
  }
});

const UploadMetadata = ({ onMetadataUploaded }) => {
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    image: "",
    attributes: [],
  });
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!metadata.name || !metadata.description) {
      alert("Please fill in both name and description");
      return;
    }

    setLoading(true);
    try {
      const result = await ipfs.add(JSON.stringify(metadata));
      const cid = result.path;
      onMetadataUploaded(cid);
      alert(`Metadata uploaded to IPFS: ipfs://${cid}`);
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      alert("Failed to upload to IPFS. Please check your credentials.");
    } finally {
      setLoading(false);
    }
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
      <button 
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Metadata"}
      </button>
    </div>
  );
};

export default UploadMetadata;