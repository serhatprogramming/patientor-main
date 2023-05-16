import { useEffect, useState } from "react";
import patients from "../services/patients";
import { Patient } from "../types";

import { useParams } from "react-router-dom";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;

  useEffect(() => {
    patients
      .getPatientInfo(id)
      .then((data) => setPatient(data))
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <div>
      {patient && (
        <>
          <h2>{patient.name}</h2>
          <p>
            {patient.gender} <br />
            ssn: {patient.ssn} <br />
            occupation: {patient.occupation}
          </p>
        </>
      )}
    </div>
  );
};

export default PatientPage;
