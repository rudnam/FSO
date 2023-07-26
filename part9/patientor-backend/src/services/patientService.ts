import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";

import { NewPatient, NoSsnPatient, Patient } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNoSsnPatients = (): NoSsnPatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (patient: NewPatient) => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getPatients,
  getNoSsnPatients,
  addPatient,
  getPatient,
};
