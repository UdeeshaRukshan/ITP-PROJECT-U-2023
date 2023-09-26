import React, { useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import { makeDeleteRequest, makeUploadRequest } from "./cloudinaryHelper";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const MultiImage = () => {
  const [files, setFiles] = useState([]);

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
      successCallback: load,
      errorCallback: error,
      progressCallback: progress,
    });

    return {
      abort: () => {
        abortRequest();
        abort();
      },
    };
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
    </div>
  );
};

export default MultiImage;
