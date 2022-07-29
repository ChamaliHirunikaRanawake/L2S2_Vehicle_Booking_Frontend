import React from "react";
import { Stack } from "@mui/material";
import { Card, CardContent, Box, Button, ButtonGroup } from "@mui/material";
import { Authcontext } from "../../Provider/AuthProvider";

function cancel(id) {
  
}

function setApprove(id) {
  console.log("apprve", id);
}

export default function Render(props) {
  const [da, setData] = React.useState([]);
  const { auth } = React.useContext(Authcontext);
  console.log(auth);

  React.useEffect(() => {
    console.log("socket monr");

    if (props.socket) {
      props.socket.on("message", (data) => {
        console.log(data);
        setData([...da, data]);
      });
    }
  }, [da, props.socket]);

  return (
    <>
      <h1>
        {auth.type} : # {auth.id}
      </h1>
      <Stack spacing={2}>
        {da.map((e) => (
          <Card key={e._id}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <p>
                  <span className="bold">id : #{e._id}</span>
                  <br />
                  <span className="bold">From : user </span> {e.user} <br />
                </p>
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <p>
                  <span className="bold">On</span>{" "}
                  {new Date(e.bookingOn).toTimeString()} <br />
                  <span className="bold">At</span>
                  {new Date(e.bookingAt).toDateString()}
                  <br />
                  <span className="bold">Status</span> {e.status}
                </p>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button
                    color="primary"
                    onClick={() => {
                      setApprove(e._id);
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      cancel(e._id);
                    }}
                    color="error"
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Stack>
    </>
  );
}
