import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { EntryFormValues, EntryType } from "../../types";
import { Box } from "@mui/system";
import { assertNever, parseDischarge, parseSickLeave } from "../../utils";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}
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

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [entryType, setEntryType] = useState(parseEntryType("HealthCheck"));
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const entryTypes = {
    "Health Check Entry": "HealthCheck",
    "Hospital Entry": "Hospital",
    "Occupation Healthcare Entry": "OccupationalHealthcare",
  };

  const showOnType = (type: string) => {
    if (entryType === type) {
      return {
        display: "block",
      };
    } else {
      return {
        display: "none",
      };
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
      description,
      specialist,
      date,
      ...(diagnosisCodes
        ? {
            diagnosisCodes: diagnosisCodes.split(", "),
          }
        : null),
    };
    switch (entryType) {
      case "HealthCheck":
        onSubmit({
          type: entryType,
          ...baseEntry,
          healthCheckRating: Number(healthCheckRating),
        });
        break;
      case "Hospital":
        onSubmit({
          type: entryType,
          ...baseEntry,
          discharge: parseDischarge({
            date: dischargeDate,
            criteria: dischargeCriteria,
          }),
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          type: entryType,
          ...baseEntry,
          employerName,
          ...(sickLeaveStart && sickLeaveEnd
            ? {
                sickLeave: parseSickLeave({
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                }),
              }
            : null),
        });
        break;
      default:
        return assertNever(entryType);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={addEntry}>
        <InputLabel id="entry-type-select-label">Entry Type</InputLabel>
        <Select
          name="entry-type"
          labelId="entry-type-select-label"
          id="entry-type-select"
          value={entryType}
          label="Entry Type"
          displayEmpty
          onChange={({ target }) => setEntryType(parseEntryType(target.value))}
        >
          {Object.keys(entryTypes).map((key: string, i) => {
            return (
              <MenuItem
                key={i}
                value={entryTypes[key as keyof typeof entryTypes]}
              >
                {key}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <TextField
          label="Health check rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
          style={showOnType("HealthCheck")}
        />
        <TextField
          label="Discharge date"
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
          style={showOnType("Hospital")}
        />
        <TextField
          label="Discharge criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
          style={showOnType("Hospital")}
        />
        <TextField
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          style={showOnType("OccupationalHealthcare")}
        />
        <TextField
          label="Sick leave start date"
          fullWidth
          value={sickLeaveStart}
          onChange={({ target }) => setSickLeaveStart(target.value)}
          style={showOnType("OccupationalHealthcare")}
        />
        <TextField
          label="Sick leave end date"
          fullWidth
          value={sickLeaveEnd}
          onChange={({ target }) => setSickLeaveEnd(target.value)}
          style={showOnType("OccupationalHealthcare")}
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEntryForm;
