import styles from "../styles/DrinkList.module.css";

const DrinkList = ({ resultingList }) => {
  return (
    <div className="mb-5">
      <ul className={styles.list}>
        {resultingList.map((m) => (
          <li key={m.name} className={`card mt-2 mb-2 ${styles.card}`}>
            <div className="card-body">
              <h3 className="card-title">{m.name}</h3>
              <div className="card-text">
                <ul className={styles.list}>
                  <h4>items you have:</h4>
                  {m.haves.map((x, i) => (
                    <li key={`${m.name}-${x}-${i}`}>{x}</li>
                  ))}
                </ul>
                <ul className={styles.list}>
                  <h4>items you need:</h4>
                  {m.needs.map((x, i) => (
                    <li key={`${m.name}-${x}-${i}`}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinkList;
