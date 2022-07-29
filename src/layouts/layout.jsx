import { React, useState, useContext } from "react";
import "./layout.css";
import AddBooking from "../pages/addBokkings";
import Sucsess from "../pages/sucsess";
import { Authcontext } from "../Provider/AuthProvider";

export default function Render(props) {
  const [is, set] = useState(true);
  const { auth } = useContext(Authcontext);
  const { type, id } = auth;

  return (
    <div className="container">
      <section className="left">
        <div style={{ textAlign: "center" }}>
          <h1>Welcome</h1>
          <p>
            <span>{type}</span> <br />#{id}
          </p>
        </div>
        <div>
          <div
            className="action_btn"
            onClick={() => {
              set(true);
            }}
          >
            Add Bookings
            <span>new</span>
          </div>
          <div
            className="action_btn"
            onClick={() => {
              set(false);
            }}
          >
            View Shedule
            <span>current</span>
          </div>
        </div>
      </section>

      <section className="center">
        {is && <AddBooking id={id}></AddBooking>}
        {!is && <Sucsess id={id}></Sucsess>}
      </section>
{/* 
      <section className="right">
        <header>Add Booking</header>
      </section> */}
    </div>
  );
}
