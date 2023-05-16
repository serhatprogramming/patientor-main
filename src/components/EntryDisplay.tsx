import { Diagnosis, Entry } from "../types";
import HealthHeart from "./HealthHeart";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";

interface EntryProps {
  entries: Entry;
  diagnoses: Diagnosis[];
}

const EntryDisplay = (props: EntryProps) => {
  const entryStyle = {
    color: "black",
    border: "1px solid",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "5px",
  };

  return (
    <div style={entryStyle} key={props.entries.id}>
      <p>
        {props.entries.date}{" "}
        {props.entries.type &&
        props.entries.type === "OccupationalHealthcare" ? (
          <>
            <WorkIcon /> {props.entries.employerName}{" "}
          </>
        ) : (
          <MedicalServicesIcon />
        )}{" "}
        <br /> {props.entries.description}
      </p>
      <ul>
        {props.entries.diagnosisCodes?.map((dc) => (
          <li key={dc}>
            {dc}{" "}
            {props.diagnoses.find((diagnose) => diagnose.code === dc)?.name}
          </li>
        ))}
      </ul>
      {props.entries.type === "HealthCheck" && (
        <HealthHeart healthCheckRating={props.entries.healthCheckRating} />
      )}
      diagnose by {props.entries.specialist}
    </div>
  );
};

export default EntryDisplay;
