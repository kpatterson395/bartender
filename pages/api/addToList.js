import { getDrinks } from "./getDrinks";

export default async (req, res) => {
  try {
    const { potentialDrinkList, currentLiquorList, placeholder } = req.body;
    let resultingList = [];
    let i = 0;
    let newPlaceholder = placeholder;
    while (
      resultingList.length < 2 &&
      i < 20 &&
      potentialDrinkList.length - 1 > newPlaceholder
    ) {
      i++;
      newPlaceholder = newPlaceholder + 1;
      let results = await getDrinks(
        potentialDrinkList[newPlaceholder],
        currentLiquorList
      );
      if (results) {
        resultingList.push(results);
      }
    }

    res.json({
      resultingList,
      newPlaceholder,
    });
  } catch (e) {
    console.error("err", e);
  }
};
