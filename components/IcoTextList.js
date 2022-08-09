import styles from "../styles/CoffeeStoreDynamic.module.css";
import IcoText from "./IcoText";

const IcoTextList = ({ dataList }) => {
  return (
    <div className={styles.icoTextList}>
      {dataList.map((entity, index) => (
        <IcoText data={entity} key={index} />
      ))}
    </div>
  );
};

export default IcoTextList;
