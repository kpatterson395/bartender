import axios from "axios";

export const getDrinks = async (drink, currentLiquorList) => {
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
    if (res.haves.length >= 2) {
      return res;
    }
  } catch (e) {
    console.log("err1", e.response.status);
    if (e.response.status === 429) return "error";
  }
};
