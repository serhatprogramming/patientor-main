import { useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
// import { HealthCheckRating } from "../types";
import MultipleSelect from "./MultipleDiagnoseSelect";
import { Diagnosis, Entry, EntryWithoutId, HealthCheckRating } from "../types";

interface EntryProps {
  addNewEntry: (object: EntryWithoutId) => Promise<Entry>;
}

const EntryForm = (props: EntryProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [diagnosis, setDiagnosis] = useState<Array<Diagnosis["code"]>>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setHealthCheckRating(Number(event.target.value as string));
  };

  return (
    <div>
      <h3>New Entry</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Hello", description, date, specialist);
          console.log("Health Rating: ", Number(healthCheckRating));
          console.log("Diagnose List: ", diagnosis);
          props.addNewEntry({
            description,
            specialist,
            date,
            type: "HealthCheck",
            healthCheckRating: Number(healthCheckRating),
          });
          setDate("");
          setDescription("");
          setSpecialist("");
          setHealthCheckRating(HealthCheckRating.Healthy);
          setDiagnosis([]);
        }}
      >
        <div>
          description:{" "}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          specialist:{" "}
          <input
            type="text"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>
        <div>
          Health Check Rating
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rating</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={healthCheckRating as unknown as string}
              label="Rating"
              onChange={handleChange}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low Risk</MenuItem>
              <MenuItem value={2}>High Risk</MenuItem>
              <MenuItem value={3}>Critical Risk</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          Diagnoses
          <br />
          <MultipleSelect setDiagnosis={setDiagnosis} diagnosis={diagnosis} />
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default EntryForm;
