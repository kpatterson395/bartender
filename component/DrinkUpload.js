import styles from "../styles/DrinkUpload.module.css";
import { useRef } from "react";

const DrinkUpload = ({ handleSubmitFile, setUploadFileImage }) => {
  const aRef = useRef("");

  return (
    <div className={styles.drinkupload}>
      <div className={styles.container}>
        <form onSubmit={handleSubmitFile} encType="multipart/form-data">
          <label
            htmlFor="uploadFromFileImage"
            className={styles.customFileUpload}
          >
            click here to upload image of your barcart
          </label>
          <input
            id="uploadFromFileImage"
            name="uploadFromFileImage"
            type="file"
            className={styles.input}
            onChange={(e) => {
              console.log("e", e);
              setUploadFileImage(e.target.files);
            }}
          />
        </form>
      </div>
    </div>
  );
};

// user adds image, auto uploads and displays, button to select image for cocktail list

export default DrinkUpload;
