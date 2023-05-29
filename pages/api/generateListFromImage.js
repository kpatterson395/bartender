import axios from "axios";
const token = process.env.API_TOKEN;
import { liquorTypes } from "../../lib/data";

export default async (req, res) => {
  const { image_url } = req.body;
  try {
    const res2 = await axios({
      method: "get",
      url: "https://api.imagga.com/v2/text",
      headers: {
        Authorization: `Basic ${token}`,
      },
      params: {
        image_url,
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
    let slice = potentialDrinkList.slice(0, 10);
    for (let drink of slice) {
      //store in database over time
      try {
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
        if (res.haves.length > 2) {
          resultingList.push(res);
        }
      } catch (e) {
        console.log(e);
      }
    }
    res.json({
      potentialDrinkList,
      currentLiquorList,
      resultingList,
    });
  } catch (e) {
    console.error("err", e);
  }
};
