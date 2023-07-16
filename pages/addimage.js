import styles from "../styles/Home.module.css";
import axios from "axios";
import Image from "next/image";

import { useEffect, useState, useRef } from "react";
import DrinkList from "../component/DrinkList";
import LoadMore from "../component/LoadMore";

export default function AddImage() {
  const [resultingList, setResultingList] = useState([]);
  const [potentialDrinkList, setPotentialDrinkList] = useState([]);
  const [currentLiquorList, setCurrentLiquorList] = useState([]);
  const [placeholder, setPlaceholder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [uploadFileImage, setUploadFileImage] = useState("");

  const aRef = useRef("");

  const handleAdd = () => {
    setLoading(true);

    const t = axios
      .post("/api/addToList", {
        potentialDrinkList,
        currentLiquorList,
        placeholder,
      })
      .then((x) => {
        setResultingList([...resultingList, ...x.data.resultingList]);
        setLoading(false);
        setPlaceholder(x.data.newPlaceholder);
      })
      .catch((e) => console.log(e));
  };

  const handleSubmitFile = async () => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const formData = new FormData();

    formData.append("image", uploadFileImage[0]);
    try {
      const { data } = await axios.post("/api/uploadImage", formData, config);
      setImgUrl(data.url);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (uploadFileImage) {
      setLoading(true);
      handleSubmitFile();
    }
  }, [uploadFileImage]);

  useEffect(() => {
    if (imgUrl && imgUrl.length) {
      setLoading(false);
    }
  }, [imgUrl]);

  const clearImage = () => {
    setResultingList([]);
    setCurrentLiquorList([]);
    setPotentialDrinkList([]);
    setPlaceholder(0);
    setUploadImage("");
    setImgUrl("");
    setUploadFileImage("");
    aRef.current.value = "";
  };

  const generateList = () => {
    if (imgUrl && imgUrl.length) {
      setLoading(true);
      const results = axios
        .post("/api/generateListFromImage", {
          image_url: imgUrl,
        })
        .then((results) => {
          const {
            resultingList,
            potentialDrinkList,
            currentLiquorList,
            placeholder,
          } = results.data;
          setResultingList(resultingList);
          setCurrentLiquorList(currentLiquorList);
          setPotentialDrinkList(potentialDrinkList);
          setPlaceholder(placeholder);
          setLoading(false);
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <div>
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
              ref={aRef}
              id="uploadFromFileImage"
              name="uploadFromFileImage"
              type="file"
              className={styles.input}
              onChange={(e) => {
                setUploadFileImage(e.target.files);
              }}
            />
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className={styles.form}>
          {loading && imgUrl.length === 0 && (
            <div className="text-center">
              <div className="spinner-grow" role="status"></div>
            </div>
          )}

          {imgUrl && (
            <div className="text-center mb-5">
              <div className={styles.imageholder}>
                <Image
                  src={imgUrl}
                  className={imgUrl ? styles.appearImage : styles.barImage}
                  alt="bar cart image"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="mt-3">
                <button className="btn" onClick={generateList}>
                  Use Image
                </button>
                <button className="btn btn-danger" onClick={clearImage}>
                  Clear Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <form
            onSubmit={(e) => {
              e.preventDefault();
              setImgUrl(uploadImage);
            }}
          >
            <div className="mb-3">
              <label
                htmlFor="uploadImage"
                className={`form-label ${styles.inputLabel}`}
              >
                Add the url of your barcart image
              </label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  name="uploadImage"
                  id="uploadImage"
                  value={uploadImage}
                  onChange={(e) => setUploadImage(e.target.value)}
                />
                <button
                  className={`btn ${styles.submitBtn}`}
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </form> */}

      <DrinkList resultingList={resultingList} />
      {loading && imgUrl && (
        <div className="text-center mt-3 mb-5">
          <span
            className={`spinner-border spinner-border-sm`}
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      )}
      <LoadMore
        resultingList={resultingList}
        handleAdd={handleAdd}
        loading={loading}
      />
    </div>
  );
}
