import patientData from "../../data/patients";

import { NoSsnPatient, Patient } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNoSsnPatients = (): NoSsnPatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNoSsnPatients,
  addPatient,
};
