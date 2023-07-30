import { getDrinks } from "./getDrinks";

export default async (req, res) => {
  try {
    const { potentialDrinkList, currentLiquorList, placeholder } = req.body;
    let resultingList = [];
    let i = 0;
    let newPlaceholder = placeholder;
    while (
      resultingList.length < 2 &&
      potentialDrinkList.length - 1 > newPlaceholder
    ) {
      i++;

      //if results of check equal result, try again in 10s
      newPlaceholder = newPlaceholder + 1;
      let results = await getDrinks(
        potentialDrinkList[newPlaceholder],
        currentLiquorList
      );
      if (results && results !== "error") {
        resultingList.push(results);
      } else if (results === "error") {
        console.log("error from retry 1");

        // the problem is the loop continues during the set timeout, so more 429 errors
        setTimeout(async () => {
          let results = await getDrinks(
            potentialDrinkList[newPlaceholder],
            currentLiquorList
          );
          if (results && results !== "error") {
            console.log("results from retry", results);
            resultingList.push(results);
          } else if (results === "error") {
            console.log("error from retry 2");
          }
        }, 10000);
        break;
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
