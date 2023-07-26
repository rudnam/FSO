import { Diagnose, Entry, Patient } from "../../types";
import { Female, Male, QuestionMark } from "@mui/icons-material";
import { Icon } from "@mui/material";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import { assertNever } from "../../utils";

interface Props {
  patient: Patient | null;
  diagnoses: Diagnose[];
}

const PatientPage = ({ patient, diagnoses }: Props) => {
  if (patient === null) {
    return <div></div>;
  }

  let genderIcon = QuestionMark;
  switch (patient.gender) {
    case "male":
      genderIcon = Male;
      break;
    case "female":
      genderIcon = Female;
      break;
    case "other":
      genderIcon = QuestionMark;
      break;
    default:
      break;
  }
  console.log(diagnoses);

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h1>
        {patient.name}
        <Icon component={genderIcon} fontSize="inherit" />
      </h1>

      <span>ssn: {patient.ssn}</span>
      <br />
      <span>occupation: {patient.occupation}</span>
      <h2>entries</h2>
      <div className="entries-container">
        {patient.entries.map((entry, i) => {
          return <EntryDetails key={i} entry={entry} />;
        })}
      </div>
    </div>
  );
};

export default PatientPage;
