import styles from "./groups.module.css";
import sendIcon from "../../assets/icons/send-icon.svg";
import { Notes } from "../notes/Notes";
import { useSelector, useDispatch } from "react-redux";
import sendColorIcon from "../../assets/icons/send-colorful-icon.svg";
import backIcon from "../../assets/icons/back-arrow.svg";
import {
  changeCurrentActiveGroup,
  createNote,
} from "../../redux/noteSlice";
import { useState, useRef, useEffect } from "react";

export const Groups = () => {
  const { currentActiveGroup, groups } = useSelector((note) => note.note);
  const dispatch = useDispatch();

  const newGrp = groups.filter((grp) => grp.id === currentActiveGroup);

  const [content, setContent] = useState("");

  const notesContainerRef = useRef(null);

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!content) {
      return;
    }

    dispatch(createNote({ content, groupId: newGrp[0].id }));
    setContent("");

    notesContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight;
    }
  }, [newGrp]);

  return (
    <div className={styles.container}>
      <div className={styles.groupName}>
        <div className={styles.groupContent}>
          <div
            className={styles.backArrow}
            onClick={() => {
              dispatch(changeCurrentActiveGroup(null));
            }}
          >
            <img src={backIcon} alt="" />
          </div>
          <div
            className={styles.img_circle}
            style={{ backgroundColor: newGrp[0].groupColor }}
          >
            <p>{newGrp[0].groupShortName}</p>
          </div>
          <h4>{newGrp[0].groupName}</h4>
        </div>
      </div>

      <div className={styles.allNotes} ref={notesContainerRef}>
        {newGrp[0].notes?.map((note, index) => (
          <Notes key={index} note={note} />
        ))}
      </div>

      <form className={styles.message_container} onSubmit={handleCreateNote}>
        <textarea
          className={styles.message}
          rows="6"
          placeholder="Enter your text here..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCreateNote(e);
            }
          }}
        />

        {content ? (
          <img
            onClick={handleCreateNote}
            src={sendColorIcon}
            alt="Send"
            className={styles.sendIcon}
            title="Send"
          />
        ) : (
          <img src={sendIcon} alt="Send" className={styles.sendIcon} />
        )}
      </form>
    </div>
  );
};
