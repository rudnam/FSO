import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Input,
} from "@mui/material";

import { Diagnose, EntryFormValues } from "../../types";
import { Box } from "@mui/system";
import {
  assertNever,
  parseDischarge,
  parseEntryType,
  parseSickLeave,
} from "../../utils";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnose[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState(parseEntryType("HealthCheck"));
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
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
      ...(diagnosisCodes ? { diagnosisCodes } : null),
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
        <InputLabel id="date-label">Date</InputLabel>
        <Input
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel id="diagnosis-code-select-label">
          Diagnosis codes
        </InputLabel>
        <Select
          name="diagnosis-code"
          id="diagnosis-code-select"
          labelId="diagnosis-code-select-label"
          value={diagnosisCodes}
          label="Diagnosis codes"
          multiple
          fullWidth
          onChange={({ target }) =>
            setDiagnosisCodes(
              typeof target.value === "string"
                ? target.value.split(",")
                : target.value
            )
          }
        >
          {diagnoses.map((diagnose, i) => {
            return (
              <MenuItem key={i} value={diagnose.code}>
                {diagnose.code}
              </MenuItem>
            );
          })}
        </Select>
        <InputLabel
          id="health-check-rating-select-label"
          style={showOnType("HealthCheck")}
        >
          Health check rating
        </InputLabel>
        <Select
          name="health-check-rating"
          id="health-check-rating-select"
          labelId="health-check-rating=-select-label"
          value={healthCheckRating}
          label="Health check rating"
          onChange={({ target }) => setHealthCheckRating(target.value)}
          style={showOnType("HealthCheck")}
        >
          {[0, 1, 2, 3].map((number, i) => {
            return (
              <MenuItem key={i} value={number}>
                {number}
              </MenuItem>
            );
          })}
        </Select>
        <InputLabel id="discharge-date-label" style={showOnType("Hospital")}>
          Discharge date
        </InputLabel>
        <Input
          type="date"
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
        <InputLabel
          id="sick-leave-start-date-label"
          style={showOnType("OccupationalHealthcare")}
        >
          Sick leave start date
        </InputLabel>
        <Input
          type="date"
          fullWidth
          value={sickLeaveStart}
          onChange={({ target }) => setSickLeaveStart(target.value)}
          style={showOnType("OccupationalHealthcare")}
        />
        <InputLabel
          id="sick-leave-end-date-label"
          style={showOnType("OccupationalHealthcare")}
        >
          Sick leave end date
        </InputLabel>
        <Input
          type="date"
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
