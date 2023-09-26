import React, { useState } from "react";
import axios from "axios"; // Import Axios

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import { makeDeleteRequest, makeUploadRequest } from "./cloudinaryHelper";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MultiImage = () => {
  const [files, setFiles] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // State to store uploaded image URLs

  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
    });
  };

  const process = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    const abortRequest = makeUploadRequest({
      file,
      fieldName,
      successCallback: (deleteToken) => {
        // Optionally, you can handle the deleteToken here
      },
      errorCallback: error,
      progressCallback: progress,
      imageUrlCallback: (imageUrl) => {
        // Handle the uploaded image URL here
        setUploadedImageUrls((prevUrls) => [...prevUrls, imageUrl]);
      },
    });

    return {
      abort: () => {
        abortRequest();
        abort();
      },
    };
  };
  const uploadImageUrlsToServer = () => {
    // Send a POST request to your server to save the image URLs using Axios
    axios
      .post("/api/setimages", { imageUrls: uploadedImageUrls })
      .then((response) => {
        console.log("Image URLs saved:", response.data.imageUrls);
      })
      .catch((error) => {
        console.error("Error saving image URLs:", error);
      });
  };
  return (
    <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
      <FilePond
        files={files}
        acceptedFileTypes="image/*"
        onupdatefiles={setFiles}
        allowMultiple={true}
        server={{ process, revert }}
        name="file"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      {/* Display uploaded image URLs */}
      {uploadedImageUrls.length > 0 && (
        <div>
          <h3>Uploaded Image URLs:</h3>
          <ul>
            {uploadedImageUrls.map((imageUrl, index) => (
              <li key={index}>
                <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                  {imageUrl}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={uploadImageUrlsToServer}>Upload Image URLs</button>
    </div>
  );
};

export default MultiImage;
