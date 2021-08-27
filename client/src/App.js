import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Home from "./routes/Home";
import Header from "./components/nav/Header";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </>
  );
};

export default App;
