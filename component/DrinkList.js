import styles from "../styles/DrinkList.module.css";
import { useEffect, useState, useRef } from "react";

const DrinkList = ({ resultingList }) => {
  const [showList, setShowList] = useState(false);

  return (
    <div className="mb-5 mx-5">
      <ul className={styles.list}>
        {resultingList.map((m) => (
          <li key={m.name} className={`card mt-2 mb-2 ${styles.card}`}>
            <div className="card-body">
              <h3 className="card-title">{m.name}</h3>
              <div className="card-text">
                <div
                  className={styles.dropDown}
                  onClick={() => setShowList(!showList)}
                >
                  <p>
                    {m.haves.length} out of {m.haves.length + m.needs.length}{" "}
                    ingredients
                  </p>
                  <p className="px-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className={
                        showList ? "bi bi-chevron-up" : "bi bi-chevron-down"
                      }
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
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
                    {m.haves.map((x, i) => (
                      <p className={styles.listParagraph}>
                        <li
                          className={styles.listItem}
                          key={`${m.name}-${x}-${i}`}
                        >
                          {x}
                        </li>
                        <span className={styles.detect}>detected</span>
                      </p>
                    ))}
                  </ul>
                  <ul className={styles.list}>
                    {m.needs.map((x, i) => (
                      <p className={styles.listParagraph}>
                        <li
                          className={styles.listItem}
                          key={`${m.name}-${x}-${i}`}
                        >
                          {x}
                        </li>
                        <span className={styles.detect}>not detected</span>
                      </p>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinkList;
