import styles from "./notes.module.css";
export const Notes = ({ note }) => {
  return (
    <div className={styles.container}>
      <div className={styles.actual_note}>{note.content}</div>
      <div className={styles.date_time_area}>
        <span>{note.date}</span>
        <span>●</span>
        <span>{note.time}</span>
      </div>
    </div>
  );
};
