import React from "react";
import Paper from "@mui/material/Paper";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button } from "@mui/material";
import Two from "./two";
import One from "./one";

export default class AddBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      data: {
        from: "",
        to: "",
        time: new Date(),
        sheets: 2,
        date: new Date(),
        type: {
          bus: false,
          van: false,
          car: false,
        },
        ac: false,
        nac: true,
        drive: "",
        driver: "",
      },
      errors: {},
      is: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkBoxHandle = this.checkBoxHandle.bind(this);
    this.calanderHandle = this.calanderHandle.bind(this);
    this.clockHandle = this.clockHandle.bind(this);
  }

  onSubmit = (event) => {
    const id = this.props.id;
    const { data } = this.state;


    console.log("submiting : ", {
      bookingAt: data.date,
      bookingOn: data.time,
      user: id, //user request
      drive: data.drive,
      driver: data.driver,
    });

    fetch("http://127.0.0.1:5000/api/booking/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingAt: data.date,
        bookingOn: data.time,
        user: id, //user request
        drive: data.drive,
        driver: data.driver,
      }),
    })
      .then((res) => {
        alert("booking sucsess");
      })
      .catch((e) => {
        window.alert("Booking Failed Someting Went Wrong");
      });
  };

  formRendering(step) {
    const { data, ac, nac } = this.state;
    const type = data.type;
    const values1 = { data, type, ac, nac };
    const values2 = data.vid;
    var func = {
      handleChange: this.handleChange,
      calanderHandle: this.calanderHandle,
      clockHandle: this.clockHandle,
      checkBoxHandle: this.checkBoxHandle,
    };

    if (step === 0) {
      return <One values={values1} {...func}></One>;
    } else if (step === 1) {
      return <Two values={values2} onSelectDriver={this.onSelectDriver}></Two>;
    }
  }

  onSelectDriver = (id, driver) => {
    console.log("driver = ", id, driver);

    this.setState(
      (pre) => ((pre.data.drive = id), (pre.data.driver = driver)),
      () => {
        console.log("on Select Driver", this.state.data);
      }
    );
  };

  handleChange(event) {
    this.setState((pre) => (pre.data[event.target.name] = event.target.value));
  }

  calanderHandle(value) {
    this.setState((pre) => (pre.data.date = new Date(value)));
    console.log(this.state.data.date);
  }

  clockHandle(value) {
    this.setState((pre) => (pre.data.time = new Date(value)));
  }
  checkBoxHandle(event) {
    if (event.target.name === "ac") {
      this.setState((pre) => {
        pre.data.ac = true;
        pre.data.nac = false;
        return pre;
      });
    } else if (event.target.name === "nac") {
      this.setState((pre) => {
        pre.data.ac = false;
        pre.data.nac = true;
        return pre;
      });
    } else {
      this.setState(
        (pre) => (pre.data.type[event.target.name] = event.target.checked)
      );
    }
  }

  btnClickHandlerNext = (event) => {
    const step = this.state.step;
    this.setState({ step: step + 1 });
  };
  btnClickHandlerPre = (event) => {
    const step = this.state.step;
    this.setState({ step: step - 1 });
  };

  render() {
    var inStyles = {
      maxHeight: "fit-content",
      padding: "10px",
      position: "relative",
    };

    var paperSx = {
      padding: "10px",
      width: "100%",
      minWidth: "inherit",
      marginBottom: "10px",
      borderRadius: "14px",
      textAlign: "center",
    };

    return (
      <>
        <Paper sx={paperSx} elevation={14}>
          <h1> Add Booking </h1>
        </Paper>

        <div style={inStyles}>
          {this.formRendering(this.state.step)}

          <div className="btn_grp" style={{ marginTop: "10px" }}>
            {this.state.step > 0 && (
              <Button
                sx={{ float: "left", backgroundColor: "yellow" }}
                variant="contained"
                onClick={this.btnClickHandlerPre}
                endIcon={<NavigateNextIcon />}
              >
                Back
              </Button>
            )}
            {this.state.step < 1 && (
              <Button
                sx={{ float: "right", backgroundColor: "yellow" }}
                variant="contained"
                onClick={this.btnClickHandlerNext}
                endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
            )}
            {this.state.step === 1 && (
              <Button
                sx={{ float: "right", backgroundColor: "yellow" }}
                variant="contained"
                onClick={this.onSubmit}
                endIcon={<NavigateNextIcon />}
              >
                Confirm
              </Button>
            )}
          </div>
        </div>
      </>
    );
  }
}
