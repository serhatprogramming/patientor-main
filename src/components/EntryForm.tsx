import { useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
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
  const [notification, setNotification] = useState("");
  const [entryType, setEntryType] = useState("HealthCheck");
  const [employerName, setEmployerName] = useState("");

  const [sickStart, setSickStart] = useState("");
  const [sickEnd, setSickEnd] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setHealthCheckRating(Number(event.target.value as string));
  };

  const resetFields = () => {
    setDate("");
    setDescription("");
    setSpecialist("");
    setHealthCheckRating(HealthCheckRating.Healthy);
    setDiagnosis([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const midEntry = {
      description,
      specialist,
      date,
      diagnosisCodes: diagnosis.length > 0 ? diagnosis : [],
    };
    switch (entryType) {
      case "HealthCheck":
        props
          .addNewEntry({
            ...midEntry,
            type: "HealthCheck",
            healthCheckRating: Number(healthCheckRating),
          })
          .then((data) => console.log("returned Data"))
          .catch((e) => {
            console.log("error: ", setNotification(e.response.data));
            setTimeout(() => {
              setNotification("");
            }, 3000);
          });
        break;
      case "Hospital":
        props
          .addNewEntry({
            ...midEntry,
            type: "Hospital",
            discharge: { date: dischargeDate, criteria: dischargeCriteria },
          })
          .then((data) => console.log("returned Data"))
          .catch((e) => {
            console.log("error: ", setNotification(e.response.data));
            setTimeout(() => {
              setNotification("");
            }, 3000);
          });
        break;
      case "OccupationalHealthCare":
        props
          .addNewEntry({
            ...midEntry,
            type: "OccupationalHealthcare",
            employerName,
            sickLeave: { startDate: sickStart, endDate: sickEnd },
          })
          .then((data) => console.log("returned Data"))
          .catch((e) => {
            console.log("error: ", setNotification(e.response.data));
            setTimeout(() => {
              setNotification("");
            }, 3000);
          });
        break;
    }

    resetFields();
  };

  return (
    <div>
      <h3>New Entry</h3>
      {notification.length > 0 && (
        <p style={{ color: "red" }}>{notification}</p>
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
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
          Diagnoses
          <br />
          <MultipleSelect setDiagnosis={setDiagnosis} diagnosis={diagnosis} />
        </div>
        <div>
          <p>
            <strong>Select Entry Type:</strong>
          </p>
          Health Check
          <input
            type="radio"
            name="filterVisibility"
            onChange={() => setEntryType("HealthCheck")}
          />
          Occupational Health Care{" "}
          <input
            type="radio"
            name="filterVisibility"
            onChange={() => setEntryType("OccupationalHealthCare")}
          />
          Hospital{" "}
          <input
            type="radio"
            name="filterVisibility"
            onChange={() => setEntryType("Hospital")}
          />
        </div>
        {entryType === "HealthCheck" && (
          <div>
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
        )}
        <br />
        {entryType === "OccupationalHealthCare" && (
          <>
            <div>
              <strong>employer name:</strong>{" "}
              <input
                type="text"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
              />
            </div>
            <div>
              <strong>Sick Leave:</strong> <br /> Start Date:{" "}
              <input
                type="date"
                value={sickStart}
                onChange={(e) => setSickStart(e.target.value)}
              />{" "}
              <br /> End Date:{" "}
              <input
                type="date"
                value={sickEnd}
                onChange={(e) => setSickEnd(e.target.value)}
              />
            </div>
          </>
        )}
        {entryType === "Hospital" && (
          <>
            <div>
              <strong>Enter Discharge Information</strong>
            </div>
            <div>
              Discharge Date:{" "}
              <input
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />{" "}
            </div>
            <div>
              Discharge Criteria:{" "}
              <input
                type="text"
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
              />
            </div>
          </>
        )}
        <br />
        <input
          type="button"
          value="cancel"
          onClick={() => resetFields()}
        />{" "}
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default EntryForm;
