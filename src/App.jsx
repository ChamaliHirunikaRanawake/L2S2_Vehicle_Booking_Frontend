import React from "react";
import Login from "./pages/login";
import Layout from "./layouts/layout";
import Driver from "./pages/driver";
import { Authcontext } from "./Provider/AuthProvider";

const { io } = require("socket.io-client");
const URI = "http://127.0.0.1:5000";

export default class App extends React.Component {
  static contextType = Authcontext;
  socket = null;

  componentDidMount() {
    this.socket = io(URI, { autoConnect: false });
  }

  setAuth = (auth) => {
    this.context.setAuth(auth);
    console.log(this.context);
    if (this.socket) {
      console.log(auth);
      this.socket.auth = auth;
      this.socket.connect();
    }
  };

  render() {
    const { type, id } = this.context.auth;

    if (type === "user" && id !== "") {
      return <Layout />;
    } else if (type === "driver" && id !== "") {
      return <Driver socket={this.socket} />;
    } else {
      return <Login onAuth={this.setAuth} />;
    }
  }
}
