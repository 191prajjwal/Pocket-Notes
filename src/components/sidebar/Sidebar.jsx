import styles from "./sidebar.module.css";
import { GroupModal} from "../groupModal/GroupModal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentActiveGroup } from "../../redux/noteSlice";

export const Sidebar = () => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const { currentActiveGroup, groups } = useSelector((note) => note.note);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Pocket Notes</h1>
      </div>

      <div className={styles.group_container}>

        {groups?.map((group) => (
          <div
            key={group.id}
            className={styles.single_group}
            style={{
              background:
                currentActiveGroup === group.id && "rgb(232, 232, 232)",
            }}
            onClick={() => {
              dispatch(changeCurrentActiveGroup(group.id));
            }}
          >
            <div
              className={styles.img_circle}
              style={{ backgroundColor: group.groupColor }}
            >
              <p>{group.groupShortName}</p>
            </div>

            <h4>{group.groupName}</h4>
          </div>
        ))}
      </div>

      <div onClick={() => setOpenModal(true)} className={styles.create_group}>
        +
      </div>

      <GroupModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
