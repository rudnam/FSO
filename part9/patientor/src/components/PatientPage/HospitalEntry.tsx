import { LocalHospital } from "@mui/icons-material";
import { HospitalEntry as HospitalEntryType } from "../../types";

interface Props {
  entry: HospitalEntryType;
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

  return (
    <div style={style}>
      {entry.date} <LocalHospital fontSize="inherit" />
      <br />
      <i>{entry.description}</i>
      <br />
      diagnose by {entry.specialist}
      <br />
      Discharge date: {entry.discharge.date}
      <br />
      Discharge criteria: {entry.discharge.criteria}
    </div>
  );
};

export default HospitalEntry;
