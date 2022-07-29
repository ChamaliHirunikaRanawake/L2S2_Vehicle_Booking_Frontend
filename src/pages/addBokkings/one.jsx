import React from "react";
import Cities from "../../data/cities-by-district-min.json";
import map from "../../assets/img/map.png";
import PersonIcon from "@mui/icons-material/Person";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  InputAdornment,
} from "@mui/material";
import styles from "./one.module.css";
import {CssTextField , LocationInput} from "../../componets";

export default function render(props) {
  var { data, type, ac, nac } = props.values;
  var { bus, van, car } = type;

  return (
    <>
      <div className={styles.body}>
        <div className={styles.form}>
          <LocationInput
            title={"from"}
            data={Cities}
            name="from"
            value={data.from}
            onChange={props.handleChange}
          />
          <LocationInput
            title={"to"}
            name="to"
            onChange={props.handleChange}
            data={Cities}
            value={data.to}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Time"
              name="time"
              onChange={props.clockHandle}
              value={data.time}
              renderInput={(params) => <CssTextField {...params} />}
            />
          </LocalizationProvider>

          <CssTextField
            onChange={props.handleChange}
            name="sheets"
            value={data.sheets}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    color: "#6295FF",
                  }}
                >
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            type="number"
            default={1}
          />
          <div style={{ display: "inline-flex", width: "250px" }}>
            <FormControl
              sx={{ m: 3, float: "left" }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">Select Vehicle Type</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={bus}
                      onChange={props.checkBoxHandle}
                      name="bus"
                    />
                  }
                  label="Bus"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={van}
                      onChange={props.checkBoxHandle}
                      name="van"
                    />
                  }
                  label="Van"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={car}
                      onChange={props.checkBoxHandle}
                      name="car"
                    />
                  }
                  label="Car"
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Select Vehicle Type</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ac}
                      onChange={props.checkBoxHandle}
                      name="ac"
                    />
                  }
                  label="NON(A/C)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={nac}
                      onChange={props.checkBoxHandle}
                      name="nac"
                    />
                  }
                  label="WITH(A/C)"
                />
              </FormGroup>
            </FormControl>
          </div>
        </div>
        <img src={map} className={styles.img} alt="" />
      </div>

      {/*in */}

      {/* <SheetsInput /> */}
      <div className={styles.date}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={data.date}
            onChange={props.calanderHandle}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </>
  );
}
