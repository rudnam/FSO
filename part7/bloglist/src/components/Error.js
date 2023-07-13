import { useSelector } from "react-redux";

function Error() {
  const errorMessage = useSelector((state) => state.errorMessage);
  const style = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div>{errorMessage ? <div style={style}>{errorMessage}</div> : null}</div>
  );
}

export default Error;
