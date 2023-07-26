import { LocalHospital } from "@mui/icons-material";
import { Entry } from "../../types";

interface Props {
  entry: Entry;
}

const HospitalEntry = ({ entry }: Props) => {
  const style = {
    padding: "5px",
    border: "1px solid black",
    borderRadius: "5px",
  };
  if (entry === null) {
    return <div></div>;
  }
  console.log(entry);

  return (
    <div style={style}>
      {entry.date} <LocalHospital fontSize="inherit" />
      <br />
      <i>{entry.description}</i>
      {entry.date}
      <br />
      diagnose by {entry.specialist}
    </div>
  );
};

export default HospitalEntry;
