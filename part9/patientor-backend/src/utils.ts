import {
  ALL_ENTRY_TYPES,
  Diagnose,
  Discharge,
  EntryType,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  NewPatient,
  SickLeave,
} from "./types";

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error("Value is not a string: " + value);
  }
  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Value is not a valid date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender");
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };
    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const isEntryType = (param: string): param is EntryType => {
  return ALL_ENTRY_TYPES.map((v) => v.toString()).includes(param);
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!isString(entryType) || !isEntryType(entryType)) {
    throw new Error("Incorrect entry type: " + entryType);
  }
  return entryType;
};

const isNumber = (param: string) => {
  return !isNaN(parseFloat(param));
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  const healthCheckRatingNumber = Number(healthCheckRating);
  if (
    !isString(healthCheckRating) ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRatingNumber)
  ) {
    throw new Error("Incorrect value for healthCheckRating");
  }
  return healthCheckRatingNumber;
};

const parseDischarge = ({
  date,
  criteria,
}: {
  date: unknown;
  criteria: unknown;
}): Discharge => {
  if (!isString(date) || !isDate(date) || !isString(criteria)) {
    throw new Error("Discharge data incorrect.");
  }
  return { date, criteria };
};

const parseSickLeave = ({
  startDate,
  endDate,
}: {
  startDate: unknown;
  endDate: unknown;
}): SickLeave => {
  if (
    !isString(startDate) ||
    !isDate(startDate) ||
    !isString(endDate) ||
    !isDate(endDate)
  ) {
    throw new Error("Incorrect sick leave");
  }
  return { startDate, endDate };
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnose["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const baseEntry: NewBaseEntry =
      "diagnosisCodes" in object
        ? {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: parseEntryType(object.type),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
          }
        : {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: parseEntryType(object.type),
          };

    switch (baseEntry.type) {
      case "HealthCheck":
        return baseToHealthCheck(baseEntry, object);
      case "Hospital":
        return baseToHospital(baseEntry, object);
      case "OccupationalHealthcare":
        return baseToOccupationalHealthcare(baseEntry, object);
      default:
        throw new Error("Should never be here");
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};

const baseToHealthCheck = (
  baseEntry: NewBaseEntry,
  object: object
): NewEntry => {
  if ("healthCheckRating" in object) {
    const healthCheckEntry: NewEntry = {
      ...baseEntry,
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
    return healthCheckEntry;
  }
  throw new Error();
};

const baseToHospital = (baseEntry: NewBaseEntry, object: object): NewEntry => {
  if ("dischargeDate" in object && "dischargeCriteria" in object) {
    const hospitalEntry: NewEntry = {
      ...baseEntry,
      type: "Hospital",
      discharge: parseDischarge({
        date: object.dischargeDate,
        criteria: object.dischargeCriteria,
      }),
    };
    return hospitalEntry;
  }
  throw new Error();
};

const baseToOccupationalHealthcare = (
  baseEntry: NewBaseEntry,
  object: object
): NewEntry => {
  if ("employerName" in object) {
    if ("sickLeaveStartDate" in object && "sickLeaveEndDate" in object) {
      const sickLeave = parseSickLeave({
        startDate: object.sickLeaveStartDate,
        endDate: object.sickLeaveEndDate,
      });
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName),
        sickLeave,
      };
    } else
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName),
      };
  }
  throw new Error();
};
export default toNewPatient;
