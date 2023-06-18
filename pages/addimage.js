import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

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

  const handleSubmitFile = async (e) => {
    e.preventDefault();
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
      <div className="d-flex justify-content-center">
        <div className={styles.form}>
          {imgUrl && (
            <div>
              <img src={imgUrl} alt="bar cart image" />
              <button className="btn btn-danger" onClick={clearImage}>
                Clear Image
              </button>
            </div>
          )}

          <form
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
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <p>OR</p>
          <form onSubmit={handleSubmitFile} encType="multipart/form-data">
            <div className="mb-3">
              <label
                htmlFor="uploadFromFileImage"
                className={`form-label ${styles.inputLabel}`}
              >
                Upload an image of your barcart from your computer
              </label>
              <div className="d-flex">
                <input
                  type="file"
                  className="form-control"
                  name="uploadFromFileImage"
                  id="uploadFromFileImage"
                  onChange={(e) => {
                    setUploadFileImage(e.target.files);
                  }}
                />
                <button
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div className="mb-5">
            <ul className={styles.list}>
              {resultingList.map((m) => (
                <li key={m.name} className={`card mt-2 mb-2 ${styles.card}`}>
                  <div className="card-body">
                    <h3 className="card-title">{m.name}</h3>
                    <div className="card-text">
                      <ul className={styles.list}>
                        <h4>items you have:</h4>
                        {m.haves.map((x, i) => (
                          <li key={`${m.name}-${x}-${i}`}>{x}</li>
                        ))}
                      </ul>
                      <ul className={styles.list}>
                        <h4>items you need:</h4>
                        {m.needs.map((x, i) => (
                          <li key={`${m.name}-${x}-${i}`}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {!!resultingList.length && (
            <div>
              <button
                className="btn btn-primary mb-5"
                onClick={handleAdd}
                disabled={loading}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                &nbsp; Get More Drinks
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
