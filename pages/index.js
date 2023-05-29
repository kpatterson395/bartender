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

  useEffect(() => {
    getInfo()
      .then((x) => {
        setResultingList(x.data.resultingList);
        setPotentialDrinkList(x.data.potentialDrinkList);
        setCurrentLiquorList(x.data.currentLiquorList);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (placeholder > 0) {
      const t = axios
        .post("/api/addToList", {
          slice: potentialDrinkList.slice(placeholder, placeholder + 10),
          currentLiquorList,
        })
        .then((x) => {
          setResultingList([...resultingList, ...x.data.resultingList]);
        })
        .catch((e) => console.log(e));
    }
  }, [placeholder]);
  return (
    <div className="container text-center mb-5">
      <h1>Bar Cart App</h1>
      <div>
        {/* <img
          src="https://www.thecocktailproject.com/sites/default/files/liquors.jpg"
          alt="bar cart image"
        /> */}
        <form action="">
          <label htmlFor="image">Upload Image</label>
          <input type="text" name="image" id="image" />
        </form>
        <div className="mb-5 d-flex justify-content-center">
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
        <button
          className="btn btn-primary"
          onClick={() => setPlaceholder(placeholder + 10)}
        >
          More
        </button>
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
