import {
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

const toNewPatient = (object: unknown): NewPatient => {
  if (!hasRequiredPatientFields(object)) {
    throw new Error("Incorrect or missing data");
  }

  const newPatient: NewPatient = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: [],
  };
  return newPatient;
};

const hasRequiredPatientFields = (object: unknown): object is NewPatient => {
  return (
    object !== null &&
    typeof object === "object" &&
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  );
};

const parseString = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error("Value is not a string: " + value);
  }
  return value;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Value is not a valid date: " + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender");
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!hasRequiredEntryFields(object)) {
    throw new Error("Incorrect or missing data");
  }

  const baseEntry: NewBaseEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    type: parseEntryType(object.type),
    ...(object.diagnosisCodes && {
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    }),
  };

  switch (baseEntry.type) {
    case "HealthCheck":
      return baseToHealthCheck(baseEntry, object);
    case "Hospital":
      return baseToHospital(baseEntry, object);
    case "OccupationalHealthcare":
      return baseToOccupationalHealthcare(baseEntry, object);
    default:
      throw new Error("Invalid entry type: " + baseEntry.type);
  }
};

const hasRequiredEntryFields = (object: unknown): object is NewBaseEntry => {
  return (
    object !== null &&
    typeof object === "object" &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  );
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!isString(entryType) || !isEntryType(entryType)) {
    throw new Error("Incorrect entry type: " + entryType);
  }
  return entryType;
};

const isEntryType = (param: string): param is EntryType => {
  const entryTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  return entryTypes.map((v) => v.toString()).includes(param);
};

const parseDiagnosisCodes = (param: unknown): Array<Diagnose["code"]> => {
  if (!isStringArray(param)) {
    return [] as Array<Diagnose["code"]>;
  }
  return param;
};

const isStringArray = (param: unknown): param is string[] => {
  return (
    Array.isArray(param) && param.every((item) => typeof item === "string")
  );
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
  throw new Error("Incomplete data for Health check entry");
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(Number(healthCheckRating))
  ) {
    throw new Error(
      "Incorrect data for Health check rating: " + healthCheckRating
    );
  }
  return Number(healthCheckRating);
};

const isNumber = (param: unknown) => {
  return (
    typeof param === "number" ||
    param instanceof Number ||
    (isString(param) && !isNaN(parseFloat(param)))
  );
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
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
  throw new Error("Incomplete data for Hospital entry");
};

const parseDischarge = ({
  date,
  criteria,
}: {
  date: unknown;
  criteria: unknown;
}): Discharge => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect data for Discharge date: " + date);
  } else if (!isString(criteria)) {
    throw new Error("Incorrect data for Discharge criteria: " + criteria);
  }
  return { date, criteria };
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
    }

    return {
      ...baseEntry,
      type: "OccupationalHealthcare",
      employerName: parseString(object.employerName),
    };
  }
  throw new Error("Incomplete data for Occupational healthcare entry");
};

const parseSickLeave = ({
  startDate,
  endDate,
}: {
  startDate: unknown;
  endDate: unknown;
}): SickLeave => {
  if (!isString(startDate) || !isDate(startDate)) {
    throw new Error("Incorrect sick leave start date: " + startDate);
  } else if (!isString(endDate) || !isDate(endDate)) {
    throw new Error("Incorrect sick leave end date: " + endDate);
  }
  return { startDate, endDate };
};

export default toNewPatient;
