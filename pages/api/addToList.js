import axios from "axios";
const token = process.env.API_TOKEN;
import { liquorTypes } from "../../lib/data";

const getDrinks = async (drink, currentLiquorList) => {
  let acceptedDrinks = [];
  try {
    const x = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`
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
    if (res.haves.length > 2) {
      acceptedDrinks.push(res);
    }
    return acceptedDrinks;
  } catch (e) {
    console.log(e);
  }
};

export default async (req, res) => {
  try {
    const { potentialDrinkList, currentLiquorList, placeholder } = req.body;
    let resultingList = [];
    let newPlaceholder = placeholder;
    while (resultingList.length < 2) {
      newPlaceholder = newPlaceholder + 1;
      let results = await getDrinks(
        potentialDrinkList[newPlaceholder],
        currentLiquorList
      );
      resultingList.push(...results);
    }

    res.json({
      resultingList,
      newPlaceholder,
    });
  } catch (e) {
    console.error("err", e);
  }
};
