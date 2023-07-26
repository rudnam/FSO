import { Diagnose, Patient } from "../../types";
import { Female, Male, QuestionMark } from "@mui/icons-material";
import { Icon } from "@mui/material";

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
          <div className="entries" id={patient.id}>
            <h2>entries</h2>
            <p>
              {entry.date} <i>{entry.description}</i>
            </p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code: String, i) => {
                  const diagnoseItem = diagnoses.find(
                    (diagnose) => diagnose.code === code
                  );
                  return (
                    <li key={i}>
                      {code} {diagnoseItem?.name}
                    </li>
                  );
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
