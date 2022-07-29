import React from "react";
import { Paper, Button, ButtonGroup, TextField } from "@mui/material";

export default class Login extends React.Component {
  form = null;
  id = null;
  constructor(props) {
    super(props);
    this.state = { value: "", type: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.form = React.createRef();
  }

  componentDidMount() {}
  handleSubmit(event) {
    this.props.onAuth({ type: event.target.value, id: this.id });
  }
  handleChange(event) {
    this.id = event.target.value;
  }
  render() {
    return (
      <Paper
        elevation={3}
        sx={{
          width: "300px",
          margin: "auto",
          minHeight: "300px",
          padding: "10px",
          left: "50%",
          position: "absolute",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <form ref={this.form}>
          <h1>Login as </h1>
          <br></br>
          <TextField
            fullWidth
            label="UserID"
            id="id"
            onChange={this.handleChange}
          />
          <ButtonGroup
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
            }}
          >
            <Button onClick={this.handleSubmit} value="driver" fullWidth>
              Driver
            </Button>
            <Button onClick={this.handleSubmit} value="user" fullWidth>
              User
            </Button>
          </ButtonGroup>
        </form>
      </Paper>
    );
  }
}
