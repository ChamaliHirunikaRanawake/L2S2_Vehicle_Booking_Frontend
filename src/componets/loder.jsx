var loder_styles = {
  position: "absolute",
  zIndex: 2,
  background: "#ebedee",
  overflow: "hidden",
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  height: "96%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Render(props) {
  return (
    <div ref={props.loder} className="loder" style={loder_styles}>
      <img
        src="https://i.pinimg.com/originals/6e/c8/fa/6ec8fa35800b339aa060d70d67edcf03.gif"
        alt="loading"
        width="300px"
      />
      <h1 ref={props.text}>Loading ........</h1>
    </div>
  );
}
