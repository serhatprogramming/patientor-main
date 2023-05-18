import { useEffect, useState } from "react";
import patients from "../services/patients";
import { getAllDiagnoses } from "../services/diagnoses";
import { Patient, Diagnosis, EntryWithoutId, Entry } from "../types";

import { useParams } from "react-router-dom";

import EntryDisplay from "./EntryDisplay";
import EntryForm from "./EntryForm";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const id = useParams().id;

  useEffect(() => {
    patients
      .getPatientInfo(id)
      .then((data) => setPatient(data))
      .catch((e) => console.log(e));

    getAllDiagnoses().then((data) => setDiagnoses(data));
  }, [id]);

  const addNewEntry = async (object: EntryWithoutId) => {
    const addedEntry: Entry = await patients.addEntry(id, object);
    return addedEntry;
  };

  return (
    <div>
      {patient && diagnoses && (
        <>
          <h2>
            {patient.name}{" "}
            {patient.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
          </h2>
          <p>
            <br />
            ssn: {patient.ssn} <br />
            occupation: {patient.occupation}
          </p>
          <EntryForm addNewEntry={addNewEntry} />

          {patient.entries.length > 0 ? (
            <>
              <h3>entries</h3>
              {patient.entries.map((entry) => (
                <EntryDisplay
                  key={entry.id}
                  entries={entry}
                  diagnoses={diagnoses}
                />
              ))}
            </>
          ) : (
            <h3>No entries yet</h3>
          )}
        </>
      )}
    </div>
  );
};

export default PatientPage;
