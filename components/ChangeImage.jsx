import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";

import resizeFile from "firebaseStorage/resizeFile";
import storage from "firebaseStorage/firebase";

export default function ChangeImage({
  distinction,
  setImage,
  setProgress,
  uploading,
  setUploading,
}) {
  const [file, setFile] = useState(null);
  const chooseFile = (e) => {
    setFile(e.target.files[0]);
    uploadImage(e.target.files[0]);
  };

  const uploadImage = async (file) => {
    if (!file) return;
    setUploading(true);
    const image = await resizeFile(file);
    const imageName = `${Date.now()}${file.name}`;
    const storageRef = ref(storage, `bakery/${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImage(downloadUrl);
          setUploading(false);
        });
      }
    );
  };
  return (
    <>
      <input
        type="file"
        id={distinction}
        className="d-none"
        disabled={uploading}
        onChange={chooseFile}
        accept="image/png,image/jpeg,image/jpg,image/webp"
      />
      <label htmlFor={distinction}>
        <span className={`main-button ${uploading ? "disabled" : ""}`}>
          Change Image
        </span>
      </label>
    </>
  );
}
