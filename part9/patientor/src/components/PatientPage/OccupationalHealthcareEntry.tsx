import { Work } from "@mui/icons-material";
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntryType;
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
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
      {entry.date} <Work fontSize="inherit" />
      <br />
      <i>{entry.description}</i>
      <br />
      diagnose by {entry.specialist}
      <br />
      Employer name: {entry.employerName}
      <br />
      {entry.sickLeave ? (
        <div>
          Sick leave start date: {entry.sickLeave.startDate} <br /> Sick leave
          end date: {entry.sickLeave.endDate}
        </div>
      ) : null}
    </div>
  );
};

export default OccupationalHealthcareEntry;
