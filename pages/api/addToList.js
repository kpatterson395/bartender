import axios from "axios";
const token = process.env.API_TOKEN;
import { liquorTypes } from "../../lib/data";

export default async (req, res) => {
  try {
    const { slice, currentLiquorList } = req.body;
    let resultingList = [];
    for (let drink of slice) {
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
      resultingList,
    });
  } catch (e) {
    console.error("err", e);
  }
};
