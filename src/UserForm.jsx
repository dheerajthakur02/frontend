import "./App.css";
import React, { useState } from "react";
import { imageDb } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const UserForm = ({ onUserAdded }) => {
  const [userData, setUserData] = useState({ name: "", userHandle: "" });
  const [imgs, setImgs] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImgs([...e.target.files]);
  };

  const handleUpload = async () => {
    if (!userData.userHandle || imgs.length === 0) {
      alert("Please enter a user handle and select images.");
      return;
    }

    setUploadStatus("Please wait until storing data...");
    setIsUploading(true);

    const urls = [];
    try {
      for (const img of imgs) {
        const imgRef = ref(imageDb, `files/${userData.userHandle}/${v4()}`);
        const snapshot = await uploadBytes(imgRef, img);
        const url = await getDownloadURL(snapshot.ref);
        urls.push(url);
      }

      const newUser = {
        ...userData,
        imageUrls: urls,
      };

      const response = await fetch("https://server-p56v460c4-dheerajthakur02s-projects.vercel.app/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();

      if (response.ok) {
        setUploadStatus("Upload successful!");
        onUserAdded();
        setUserData({ name: "", userHandle: "" });
        setImgs([]);
      } else {
        setUploadStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      console.log(err);
      setUploadStatus("Error occurred during upload. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <form>
        <h2>Submission Form</h2>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
          disabled={isUploading}
        />
        <br />
        <label>User Handle: </label>
        <input
          type="text"
          name="userHandle"
          placeholder="UserHandle"
          value={userData.userHandle}
          onChange={handleChange}
          disabled={isUploading}
        />
        <br />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <br />
        <button type="button" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload and Save"}
        </button>
      </form>
      
      {uploadStatus && <p>{uploadStatus}</p>}
    </>
  );
};

export default UserForm;
