import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import classes from "./single.module.css";

const Single = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className={classes.single}>
      <div className={classes.singleContainer}>
        <div className={classes.top}>
          <div className={classes.left}>
            <div className={classes.editButton}>Edit</div>
            <h1 className={classes.title}>Information</h1>
            <div className={classes.item}>
              <img
                src={user.img}
                alt=""
                className={user.itemImg}
              />
              <div className={classes.details}>
                <h1 className={classes.itemTitle}>{user.name}</h1>
                <div className={classes.detailItem}>
                  <span className={classes.itemKey}>Email:</span>
                  <span className={classes.itemValue}>{user.email}</span>
                </div>
                <div className={classes.detailItem}>
                  <span className={classes.itemKey}>Phone:</span>
                  <span className={classes.itemValue}>{user.phone}</span>
                </div>
                <div className={classes.detailItem}>
                  <span className={classes.itemKey}>Address:</span>
                  <span className={classes.itemValue}>
                    {user.address}
                  </span>
                </div>
                <div className={classes.detailItem}>
                  <span className={classes.itemKey}>Country:</span>
                  <span className={classes.itemValue}>{user.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
