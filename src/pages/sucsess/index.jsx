import { Card, CardContent, Box, Paper } from "@mui/material";
import styles from "./sucsess.module.css";
import { useEffect, useState } from "react";
import { Loder } from "../../componets";
import React from "react";

const loder = React.createRef();
const text = React.createRef();
export default function Render(props) {
  var paperSx = {
    padding: "10px",
    width: "100%",
    minWidth: "inherit",
    marginBottom: "10px",
    borderRadius: "14px",
    textAlign: "center",
  };
  var [data, setData] = useState([]);

  const id = props.id;
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/booking/success?id=${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((actualData) => {
        console.log("sucsess",actualData);
        loder.current.style.display = "none";
        setData(actualData);
      })
      .catch((e) => {
        text.current.innerHTML = "Please Check Your Connection";
        console.error(e);
      });
    // eslint-disable-next-line
  }, []);
 // data = typeof data === "object" ? [] : data;
  return (
    <>
      <Paper sx={paperSx} elevation={14}>
        <h1> Sheduled</h1>
      </Paper>
      <section className="sucsess_list">
        {data.map((e) => (
          <Card key={e._id}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <p>
                  <span className="bold">id : #{e._id}</span>
                  <br />
                  <span className="bold">From</span> 79864390321 <br />
                  <span className="bold">To</span> 56800853245
                </p>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <p>
                  <span className="bold">On</span>{" "}
                  {new Date(e.bookingOn).toTimeString()} <br />
                  <span className="bold">At</span>{" "}
                  {new Date(e.bookingAt).toDateString()}
                  <br />
                  <span className="bold">Status</span>
                  <span
                    className={
                      e.status === "pending"
                        ? styles.pending
                        : e.status === "approve"
                        ? styles.approve
                        : styles.cancel
                    }
                  >
                    {e.status}
                  </span>
                  {e.status !== "cancel" && e.status !== "approve" && (
                    <a className={styles.cancelbtn} href="/#">
                      Cancel
                    </a>
                  )}
                </p>
              </CardContent>
            </Box>
          </Card>
        ))}
        <Loder loder={loder} text={text} />
      </section>
    </>
  );
}
