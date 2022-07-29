import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Divider,
  Rating,
  Modal,
  Link,
  Box,
} from "@mui/material";
import { Loder } from "../../componets";

export default class Two extends React.Component {
  loder = React.createRef();
  text = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      mdata: null,
      selected: null,
    };
  }

  handleOpen = (e) => {
    console.log(e);
    // this.state.data[]
    this.setState({ mdata: e });
    this.setState({ open: true });
  };
  handleClose = () => this.setState({ open: false });

  onSelect = (drive, driver) => {
    this.setState({ selected: drive });
    this.props.onSelectDriver(drive, driver);
  };

  componentDidMount() {
    var loder = this.loder;
    var text = this.text;
    console.log("on Mount", loder, text);
    text.current.innerHTML = "Loading.......";
    fetch("http://127.0.0.1:5000/api/booking/getNvehicles?limit=3&skip=0", {
      method: "get",
    })
      .then((res) => res.json())
      .then((actualData) => {
        console.log(actualData);
        loder.current.style.display = "none";
        this.setState({ data: actualData });
      })
      .catch((e) => {
        text.current.innerHTML = "Please Check Your Connection";
        console.error(e);
      });
  }

  render() {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      textAlign: "center",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
    var vehicle_styles = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      alignItems: "center",
      minHeight: "300px",
    };

    const data = this.state.data;
    const mdata = this.state.mdata;

    return (
      <>
        <h1>Selecct Your Vehicle</h1>
        <section className="vehicle_list" style={vehicle_styles}>
          <span name="test"></span>

          {data.map((e) => (
            <Card
              key={e._id}
              id={e._id}
              onClick={() => {
                this.onSelect(e._id, e.driver._id);
              }}
              sx={{
                display: "inline-flex",
                borderRadius: "20px",
                padding: "5px",
                margin: "5px 0px",
                mixWeight: "800px",
                background: this.state.selected === e._id ? "green" : "white",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 151, padding: "10px" }}
                image="https://icon-library.com/images/vehicle-icon-png/vehicle-icon-png-16.jpg"
                alt="Live from space album cover"
              />
              <Divider orientation="vertical" />
              <CardContent>
                <Typography variant="h5">{e.vehicle.name}</Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {e.carModel} - type:{e.vehicle.type}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  sheets - {e.vehicle.sheets}
                </Typography>
              </CardContent>
              <Divider orientation="vertical" flexItem />
              <CardContent>
                <Typography
                  component={Link}
                  onClick={() => {
                    this.handleOpen(e.driver);
                  }}
                  variant="h6"
                  href="#"
                >
                  {e.driver.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Car Number - {e.vehicle.carNumber}
                </Typography>
                <Rating
                  name="half-rating-read"
                  value={e.driver.rating}
                  precision={0.5}
                  readOnly
                />
              </CardContent>
            </Card>
          ))}

          {this.state.mdata != null && (
            <Modal
              keepMounted
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h6">
                  {mdata.name} 
                </Typography>

                <Rating
                  name="half-rating-read"
                  value={mdata.rating}
                  precision={0.5}
                  readOnly
                />

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  licenseNo - {mdata.licenseNo}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  mobile - {mdata.contactNumbers}
                </Typography>

                {/* <span>{...mdata.address}</span> */}
                <br />
                <span>{mdata._id}</span>
              </Box>
            </Modal>
          )}
          <Loder loder={this.loder} text={this.text} />
        </section>
      </>
    );
  }
}
