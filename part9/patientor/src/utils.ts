import { Discharge, EntryType, SickLeave } from "./types";

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
};

export const parseEntryType = (entryType: unknown): EntryType => {
  if (!isString(entryType) || !isEntryType(entryType)) {
    throw new Error("Incorrect entry type: " + entryType);
  }
  return entryType;
};

const isEntryType = (param: string): param is EntryType => {
  const entryTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  return entryTypes.map((v) => v.toString()).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseDischarge = (discharge: unknown): Discharge => {
  if (
    discharge === null ||
    typeof discharge !== "object" ||
    !isDischarge(discharge)
  ) {
    throw new Error(
      "Incorrect data for Discharge: " + JSON.stringify(discharge)
    );
  }
  return discharge;
};

const isDischarge = (param: object): param is Discharge => {
  return "date" in param && "criteria" in param;
};

export const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    sickLeave === null ||
    typeof sickLeave !== "object" ||
    !isSickLeave(sickLeave)
  ) {
    throw new Error("Incorrect Sick leave: " + JSON.stringify(sickLeave));
  }
  return sickLeave;
};

const isSickLeave = (param: object): param is SickLeave => {
  return "startDate" in param && "endDate" in param;
};
