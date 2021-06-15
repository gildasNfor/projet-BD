import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import axiosInstance from "./axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUser } from "./redux/actions/authActions";
import { setActiveTontine } from "./redux/actions/tontineActions";

const App = ({ setUser, setActiveTontine }) => {
  useEffect(() => {
    axiosInstance
      .get("/dj-rest-auth/user")
      .then(res => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("active_tontine")) {
      const string = localStorage.getItem("active_tontine");
      const active_tontine = JSON.parse(string);
      console.log(active_tontine);
      setActiveTontine(active_tontine);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/app" render={props => <AdminLayout {...props} />} />
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setUser, setActiveTontine }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
