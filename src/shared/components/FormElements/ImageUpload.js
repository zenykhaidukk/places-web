import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";
import Button from "./Button";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickerHandler = (e) => {
    let newFile;
    let fileIsValid = isValid;
    if (e.target.files || e.target.files.length === 0) {
      newFile = e.target.files[0];
      setFile(newFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, newFile, fileIsValid);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="form-control">
      <input
        onChange={pickerHandler}
        ref={filePickerRef}
        type={"file"}
        id={props.id}
        style={{ display: "none" }}
        accep={".jpg,.png,.jpeg"}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl ? <img src={previewUrl} alt="Preview" /> : <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>props.errorText</p>}
    </div>
  );
};

export default ImageUpload;
