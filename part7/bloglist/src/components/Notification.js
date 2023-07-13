import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector((state) => state.notification);
  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div>{notification ? <div style={style}>{notification}</div> : null}</div>
  );
}

export default Notification;
