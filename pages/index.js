import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { liquorTypes } from "../lib/data";

const token = process.env.API_TOKEN;

export default function Home({
  currentLiquorList,
  potentialDrinkList,
  resultingList,
}) {
  return (
    <div>
      <h1>Bar Cart App</h1>
      <div>
        <img
          src="https://www.thecocktailproject.com/sites/default/files/liquors.jpg"
          alt="bar cart image"
        />
        <ul>
          {resultingList.map((m) => (
            <li>
              <h3>{m.name}</h3>
              <ul>
                <h4>items you have:</h4>
                {m.haves.map((x) => (
                  <li>{x}</li>
                ))}
              </ul>
              <ul>
                <h4>items you need:</h4>
                {m.needs.map((x) => (
                  <li>{x}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  let url = "https://api.imagga.com/v2/text";
  try {
    const res2 = await axios({
      method: "get",
      url,
      headers: {
        Authorization: `Basic ${token}`,
      },
      params: {
        image_url:
          "https://www.thecocktailproject.com/sites/default/files/liquors.jpg",
      },
    });
    const types = res2.data.result.text.map((d) => d.data);

    let currentLiquorList = [];
    let potentialDrinkList = [];

    types.forEach((type) => {
      liquorTypes.forEach((liquor) => {
        if (type.toLowerCase().includes(liquor)) {
          currentLiquorList.push(liquor);
        }
      });
    });
    for (let liq of currentLiquorList) {
      const d = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liq}`
      );
      potentialDrinkList.push(...d.data.drinks);
    }
    let resultingList = [];
    potentialDrinkList.splice(10);
    for (let drink of potentialDrinkList) {
      const x = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
      );
      const drinkData = x.data.drinks[0];

      let res = { name: drinkData.strDrink, haves: [], needs: [] };
      let ingredients = [];
      Object.keys(drinkData).forEach((key) => {
        if (key.includes("Ingredient") && drinkData[key]) {
          ingredients.push(drinkData[key]);
        }
      });
      ingredients.forEach((i) => {
        if (currentLiquorList.includes(i.toLowerCase())) {
          res.haves.push(i);
        } else {
          res.needs.push(i);
        }
      });
      resultingList.push(res);
    }
    return { props: { potentialDrinkList, currentLiquorList, resultingList } };
  } catch (e) {
    console.log("err", e);
  }
};
