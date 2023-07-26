import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";

import { NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, entries: _entries, ...rest }) => rest);
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

const addPatientEntry = (patientId: string, entry: NewEntry) => {
  const id: string = uuid();
  const newEntry = {
    id,
    ...entry,
  };
  const patient = patients.find((p) => p.id === patientId);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addPatientEntry,
};
