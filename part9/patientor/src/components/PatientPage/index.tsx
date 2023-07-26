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
    </div>
  );
};

export default PatientPage;
