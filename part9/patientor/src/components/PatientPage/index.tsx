import { useState } from "react";
import { Diagnose, Entry, EntryFormValues, Patient } from "../../types";
import { Female, Male, QuestionMark } from "@mui/icons-material";
import { Button, Icon } from "@mui/material";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import { assertNever } from "../../utils";
import AddEntryModal from "../AddEntryModal";
import patientService from "../../services/patients";
import axios from "axios";

interface Props {
  patient: Patient | null;
  diagnoses: Diagnose[];
}

const PatientPage = ({ patient, diagnoses }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      patient.entries.push(entry);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <br />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
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
