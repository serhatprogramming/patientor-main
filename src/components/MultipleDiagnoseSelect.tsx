import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getAllDiagnoses } from "../services/diagnoses";
import { Diagnosis } from "../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let diagnosisList: Array<Diagnosis["code"]> = [];

getAllDiagnoses().then((diagnosis) => {
  diagnosis.map((diagnose) => diagnosisList.push(diagnose.code));
});

// const diagnosisList = getAllDiagnoses().map(diagnose=>diagnose.code);
// [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

function getStyles(
  name: string,
  diagnosis: Array<Diagnosis["code"]>,
  theme: Theme
) {
  return {
    fontWeight:
      diagnosis.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface MSProps {
  setDiagnosis: React.Dispatch<React.SetStateAction<string[]>>;
  diagnosis: string[];
}

const MultipleSelect = (props: MSProps) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof props.diagnosis>) => {
    const {
      target: { value },
    } = event;
    props.setDiagnosis(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    props.setDiagnosis(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Code</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={props.diagnosis}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {diagnosisList.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.diagnosis, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
