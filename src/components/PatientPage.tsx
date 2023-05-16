import { useEffect, useState } from "react";
import patients from "../services/patients";
import { getAllDiagnoses } from "../services/diagnoses";
import { Patient, Diagnosis } from "../types";

import { useParams } from "react-router-dom";

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

  return (
    <div>
      {patient && diagnoses && (
        <>
          <h2>{patient.name}</h2>
          <p>
            {patient.gender} <br />
            ssn: {patient.ssn} <br />
            occupation: {patient.occupation}
          </p>

          {patient.entries.length > 0 ? (
            <>
              <h3>entries</h3>
              {patient.entries.map((entry) => (
                <div key={patient.id}>
                  <p>
                    {patient.entries[0].date} {patient.entries[0].description}
                  </p>
                  <ul>
                    {patient.entries[0].diagnosisCodes?.map((dc) => (
                      <li key={dc}>{dc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <h3>No entries yet</h3>
          )}

          {console.log(diagnoses)}
        </>
      )}
    </div>
  );
};

export default PatientPage;
