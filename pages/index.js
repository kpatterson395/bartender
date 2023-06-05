import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { liquorTypes } from "../lib/data";

const token = process.env.API_TOKEN;

export default function Home() {
  const [resultingList, setResultingList] = useState([]);
  const [potentialDrinkList, setPotentialDrinkList] = useState([]);
  const [currentLiquorList, setCurrentLiquorList] = useState([]);
  const [placeholder, setPlaceholder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState("");
  const [uploadFileImage, setUploadFileImage] = useState("");

  // useEffect(() => {
  //   getInfo()
  //     .then((x) => {
  //       setResultingList(x.data.resultingList);
  //       setPotentialDrinkList(x.data.potentialDrinkList);
  //       setCurrentLiquorList(x.data.currentLiquorList);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  const handleAdd = () => {
    setLoading(true);

    const t = axios
      .post("/api/addToList", {
        potentialDrinkList,
        currentLiquorList,
        placeholder,
      })
      .then((x) => {
        console.log("list", x);
        setResultingList([...resultingList, ...x.data.resultingList]);
        setLoading(false);
        setPlaceholder(x.data.newPlaceholder);
      })
      .catch((e) => console.log(e));
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    console.log(e);
    let uploadId = "";
    // try {
    //   const results = await axios.post("/api/uploadImage", {
    //     uploadFileImage:
    //       "https://www.thecocktailproject.com/sites/default/files/liquors.jpg",
    //   });
    //   uploadId = results.data;
    //   console.log(uploadId);
    // } catch (e) {
    //   console.log(e);
    // }
    // if (uploadId) {
    // try {
    //   const results = await axios.post("/api/generateListFromUpload", {
    //     uploadId: "i12371387b2aa9b68de4ef77b8ybqzRj",
    //   });
    //   console.log(results);
    // } catch (e) {
    //   console.log(e);
    // }
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await axios.post("/api/generateListFromImage", {
        image_url: uploadImage,
      });
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container text-center">
      <h1 className="mt-5">bar sensei</h1>

      <div className="d-flex justify-content-center">
        <div className={styles.form}>
          {/* <img
          src="https://www.thecocktailproject.com/sites/default/files/liquors.jpg"
          alt="bar cart image"
        /> */}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label
                htmlFor="uploadImage"
                className={`form-label ${styles.inputLabel}`}
              >
                Upload an image of your barcart
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

          <form action="/api/uploadImage" method="POST">
            <div className="mb-3">
              <label
                htmlFor="uploadFromFileImage"
                className={`form-label ${styles.inputLabel}`}
              >
                Upload an image of your barcart
              </label>
              <div className="d-flex">
                <input
                  type="file"
                  className="form-control"
                  name="uploadFromFileImage"
                  id="uploadFromFileImage"
                  value={uploadFileImage}
                  onChange={(e) => {
                    setUploadFileImage(e.target.value);
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

const getInfo = () => {
  return axios
    .get("/api/generateList")
    .then((output) => output)
    .catch((error) => console.log(error));
};

// export const getServerSideProps = async () => {
//   let url = "https://api.imagga.com/v2/text";
//   try {
//     const res2 = await axios({
//       method: "get",
//       url,
//       headers: {
//         Authorization: `Basic ${token}`,
//       },
//       params: {
//         image_url:
//           "https://www.thecocktailproject.com/sites/default/files/liquors.jpg",
//       },
//     });
//     const types = res2.data.result.text.map((d) => d.data);

//     let currentLiquorList = [];
//     let potentialDrinkList = [];

//     types.forEach((type) => {
//       liquorTypes.forEach((liquor) => {
//         if (type.toLowerCase().includes(liquor)) {
//           currentLiquorList.push(liquor);
//         }
//       });
//     });
//     for (let liq of currentLiquorList) {
//       const d = await axios.get(
//         `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liq}`
//       );
//       potentialDrinkList.push(...d.data.drinks);
//     }
//     let resultingList = [];
//     let slice = potentialDrinkList.slice(0, 10);
//     for (let drink of slice) {
//       //store in database over time
//       try {
//         const x = await axios.get(
//           `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
//         );
//         const drinkData = x.data.drinks[0];

//         let res = { name: drinkData.strDrink, haves: [], needs: [] };
//         let ingredients = [];
//         Object.keys(drinkData).forEach((key) => {
//           if (key.includes("Ingredient") && drinkData[key]) {
//             ingredients.push(drinkData[key]);
//           }
//         });
//         ingredients.forEach((i) => {
//           if (currentLiquorList.includes(i.toLowerCase())) {
//             res.haves.push(i);
//           } else {
//             res.needs.push(i);
//           }
//         });
//         if (res.haves.length > 2) {
//           resultingList.push(res);
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     }
//     return { props: { potentialDrinkList, currentLiquorList, resultingList } };
//   } catch (e) {
//     console.log("err", e);
//   }
// };
