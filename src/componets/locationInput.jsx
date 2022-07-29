import React from "react";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import styles from "./css/locationInput.module.css";

export default class LocationInput extends React.Component {
  getCities(json) {
    let content = [];
    for (let key in json) {
      var inKey = [];
      for (let k of json[key].cities) {
        inKey.push(
          <option key={k} value={k}>
            {k}
          </option>
        );
      }

      content.push(
        <optgroup key={key} label={key}>
          {inKey}
        </optgroup>
      );
    }
    return content;
  }

  render() {
    return (
      <div className={styles.div}>
        <AddLocationOutlinedIcon
          sx={{
            fortSize: "20xp",
            padding: "5px 0",
            color: "#6295FF",
          }}
        />
        <span>{this.props.title}</span>
        <select {...this.props} className={styles.select}>
          {this.getCities(this.props.data)}
        </select>
      </div>
    );
  }
}


