import styles from "../styles/DrinkList.module.css";

import ListItem from "./ListItem";

const DrinkList = ({ resultingList }) => {
  return (
    <div className="mb-5 mx-5">
      <ul className={styles.list}>
        {resultingList.map((m, i) => (
          <ListItem drink={m} key={`${m.name}-${i}`} />
        ))}
      </ul>
    </div>
  );
};

export default DrinkList;
