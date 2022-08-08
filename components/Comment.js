import Image from "next/image";
import { getDateString } from "../utils";

import styles from "../styles/CommentSection.module.css";

const Comment = ({ commentInfo }) => {
  const { text, created_at } = { ...commentInfo };
  const date = getDateString(created_at);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src="/static/images/user.png"
          layout="fill"
          alt="user-ico"
        />
      </div>
      <div className={styles.infoContainer}>
        <h3>Anonymus</h3>
        <p>{text}</p>
      </div>
      <span className={styles.dateContainer}>{date}</span>
    </div>
  );
};

export default Comment;
