import { useState } from "react";
import styles from "../styles/DrinkItem.module.css";

const ListItem = ({ drink }) => {
  const [showList, setShowList] = useState(false);

  return (
    <li key={drink.name} className={`card mt-2 mb-2 ${styles.card}`}>
      <div className="card-body">
        <h3 className="card-title">{drink.name}</h3>
        <div className="card-text">
          <div
            className={styles.dropDown}
            onClick={() => setShowList(!showList)}
          >
            <p>
              {drink.haves.length} out of{" "}
              {drink.haves.length + drink.needs.length} ingredients
            </p>
            <p className="px-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={showList ? "bi bi-chevron-up" : "bi bi-chevron-down"}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d={
                    showList
                      ? "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                      : "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  }
                />
              </svg>
            </p>
          </div>
          <div
            className={styles.listContainer}
            style={{ display: showList ? "block" : "none" }}
          >
            <ul className={styles.list}>
              {drink.haves.map((x, i) => (
                <p
                  className={styles.listParagraph}
                  key={`${drink.name}-${x}-${i}`}
                >
                  <li className={styles.listItem}>{x}</li>
                  <span className={styles.detect}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                    </svg>
                  </span>
                </p>
              ))}
            </ul>
            <ul className={styles.list}>
              {drink.needs.map((x, i) => (
                <p
                  className={styles.listParagraph}
                  key={`${drink.name}-${x}-${i}`}
                >
                  <li className={styles.listItem}>{x}</li>
                  <span className={styles.noDetect}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                    </svg>
                  </span>
                </p>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
