import React, { useState } from "react";

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MDcyYzBjZC1jYjMyLTQxMjYtODgzZi03ZGZmMjFiZDViZDAiLCJlbWFpbCI6ImFhcm9udmVybmVrYXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImE1ZGM1Y2EyYTg5MTY2Y2Q4NjZjIiwic2NvcGVkS2V5U2VjcmV0IjoiNjBhMTg4ZmRiYTFhMWNkZTQ1ZTNhZjNkODFjNGRiN2RiYWFhY2QyZTk3NWI3ZGEzMmYwNjYyZmNiNzkzMTRiMSIsImV4cCI6MTc2ODU2NTMzMX0.V-Y-fzyq9-3nHwneMXcBc2ZkN_ain73pCkre9rqhCjU";

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
      
      const jsonString = JSON.stringify(metadata);
      
      
      const blob = new Blob([jsonString], { type: "application/json" });
      
      
      const file = new File([blob], "metadata.json", { type: "application/json" });
      
      
      const formData = new FormData();
      formData.append("file", file);

      
      const pinataMetadata = JSON.stringify({
        name: `${metadata.name}-metadata`,
        keyvalues: {
          type: "nft-metadata",
          date: new Date().toISOString()
        }
      });
      formData.append('pinataMetadata', pinataMetadata);


      const pinataOptions = JSON.stringify({
        cidVersion: 1,
        wrapWithDirectory: false
      });
      formData.append('pinataOptions', pinataOptions);

      // Upload to Pinata
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      
      if (response.ok) {
        const ipfsCid = result.IpfsHash;
        onMetadataUploaded(ipfsCid);
        alert(`Metadata uploaded to IPFS: ipfs://${ipfsCid}`);
      } else {
        throw new Error(result.error?.details || 'Upload failed');
      }
    } catch (error) {
      console.error("Error uploading :", error);
      alert("Failed to upload to IPFS. .");
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