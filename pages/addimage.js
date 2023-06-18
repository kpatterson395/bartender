import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import DrinkList from "../component/DrinkList";
import LoadMore from "../component/LoadMore";
import DrinkUpload from "../component/DrinkUpload";

export default function AddImage() {
  const [resultingList, setResultingList] = useState([]);
  const [potentialDrinkList, setPotentialDrinkList] = useState([]);
  const [currentLiquorList, setCurrentLiquorList] = useState([]);
  const [placeholder, setPlaceholder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [uploadFileImage, setUploadFileImage] = useState("");

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
    setLoading(true);
    handleSubmitFile();
  }, [uploadFileImage]);

  useEffect(() => {
    setLoading(false);

    if (imgUrl.length) {
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
          setUploadImage("");
          setLoading(false);
        })
        .catch((e) => console.error(e));
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
  };

  return (
    <div>
      <DrinkUpload
        handleSubmitFile={handleSubmitFile}
        setUploadFileImage={setUploadFileImage}
      />

      <div className="d-flex justify-content-center">
        <div className={styles.form}>
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}

          {imgUrl && (
            <div>
              <img src={imgUrl} alt="bar cart image" />
              <button className="btn">Use Image</button>
              <button className="btn btn-danger" onClick={clearImage}>
                Clear Image
              </button>
            </div>
          )}

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
          <LoadMore
            resultingList={resultingList}
            handleAdd={handleAdd}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
