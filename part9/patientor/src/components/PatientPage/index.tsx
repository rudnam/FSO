import { Patient } from "../../types";
import { Female, Male, QuestionMark } from "@mui/icons-material";
import { Icon } from "@mui/material";

interface Props {
  patient: Patient | null;
}

const PatientPage = ({ patient }: Props) => {
  if (patient === null) {
    return <div></div>;
  }
  console.log(patient);
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

  return (
    <div>
      <h1>
        {patient.name}
        <Icon component={genderIcon} fontSize="inherit" />
      </h1>

      <span>ssn: {patient.ssn}</span>
      <br />
      <span>occupation: {patient.occupation}</span>
      {patient.entries.map((entry) => {
        return (
          <div className="entries">
            <h2>entries</h2>
            <p>
              {entry.date} <i>{entry.description}</i>
            </p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code: String) => {
                  return <li>{code}</li>;
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PatientPage;
