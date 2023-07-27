import { MedicalServices } from "@mui/icons-material";
import { HealthCheckEntry as HealthCheckEntryType } from "../../types";

interface Props {
  entry: HealthCheckEntryType;
}

const HealthCheckEntry = ({ entry }: Props) => {
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
      {entry.date} <MedicalServices fontSize="inherit" />
      <br />
      <i>{entry.description}</i>
      <br />
      {entry.healthCheckRating}
      <br />
      diagnose by {entry.specialist}
    </div>
  );
};

export default HealthCheckEntry;
