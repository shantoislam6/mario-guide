import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import useFirestoreStateCount from "../hooks/useFireStoreStateCount";
import Moment from "react-moment";

const Notification = () => {
  const firestoreStateCount = useFirestoreStateCount();
  useFirestoreConnect({
    collection: "notifications",
    limit: 7,
    orderBy: ["time", "desc"]
  });

  const notificaions = useSelector(
    state => state.firestore.ordered.notifications
  );

  return (
    <div
      className="notifications"
      style={{
        position: "fixed",
        width: "25%",
        top: 100
      }}
    >
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notification</span>
          <div
            className="notification-lists"
            style={{
              listStyle: "none",
              maxHeight: 420,
              overflowY: "auto",
              padding: "10px"
            }}
          >
            {notificaions && firestoreStateCount > 0 ? (
              <NotificationItems notifs={notificaions} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationItems = ({ notifs }) => {
  const uid = useSelector(state => state.firebase.auth.uid);
  return (
    <>
      {notifs.map(noti => (
        <li
          key={noti.id}
          className="notification-list"
          style={{
            marginBottom: 10
          }}
        >
          <span className="pink-text">
            {noti.user.uid === uid
              ? "You"
              : noti.user.firstName + " " + noti.user.lastName}{" "}
          </span>
          <span>{noti.name} </span>
          <div className="grey-text note-date">
            {<Moment fromNow>{noti.time}</Moment>}
          </div>
        </li>
      ))}
    </>
  );
};

export default Notification;
