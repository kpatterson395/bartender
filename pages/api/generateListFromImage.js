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
    let potentialDrinkListDup = [];

    let parsedTypes = [];
    types.forEach((a) => {
      if (a.toLowerCase().includes("triple sec")) {
        parsedTypes.push("triple sec");
      } else if (a.toLowerCase().includes("irish cream")) {
        parsedTypes.push("irish cream");
      } else {
        parsedTypes.push(...a.toLowerCase().replace(/\n/g, " ").split(" "));
      }
    });
    for (let type of parsedTypes) {
      if (liquorTypes.includes(type)) {
        currentLiquorList.push(type);
        const d = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${type}`
        );
        potentialDrinkListDup.push(...d.data.drinks.map((x) => x.idDrink));
      }
    }

    let potentialDrinkList = [...new Set(potentialDrinkListDup)];

    let resultingList = [];
    let placeholder = 0;
    let i = 0;
    for (let id of potentialDrinkList) {
      //store in database over time
      i++;
      if (resultingList.length >= 3 || i > 10) {
        placeholder = potentialDrinkList.indexOf(id);
        break;
      }
      try {
        const x = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
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
        console.error(e);
      }
    }
    res.json({
      potentialDrinkList,
      currentLiquorList,
      resultingList,
      placeholder,
    });
  } catch (e) {
    console.error("err", e);
  }
};
