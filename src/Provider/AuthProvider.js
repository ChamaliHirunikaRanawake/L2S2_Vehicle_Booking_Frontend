import React from "react";
var init = {
  type: "user",
  id: "",
};
const Authcontext = React.createContext(init);

function Auth(props) {
  const [auth, setAuth] = React.useState(init);
  return (
    <Authcontext.Provider value={{ auth, setAuth }}>
      {props.children}
    </Authcontext.Provider>
  );
}

export { Auth as AuthProvider, Authcontext };
