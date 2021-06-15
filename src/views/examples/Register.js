/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import axiosInstance from "../../axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUser } from "../../redux/actions/authActions";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Register = ({ setUser }) => {
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
    phone_number: "",
    birth_date: "",
    address: "",
    profession: "",
  });

  const history = useHistory();

  const handleChange = event => {
    const { name, value } = event.target;

    setProfile(profile => {
      return { ...profile, [name]: value };
    });
  };

  const submitForm = e => {
    e.preventDefault();

    axiosInstance
      .post(`/dj-rest-auth/registration/`, profile)
      .then(res => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        setUser(res.data.user);
        console.log(res);
        history.push("/admin/user-profile");
      })
      .catch(err => {
        console.log(err.message);
      });

    // setProfile({
    //   firstname: "",
    //   lastname: "",
    //   username: "",
    //   email: "",
    //   password1: "",
    //   password2: "",
    //   phone_number: "",
    //   birth_date: "",
    //   address: "",
    //   profession: "",
    // });
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name"
                    type="text"
                    label="First Name"
                    name="firstname"
                    value={profile.firstname}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    name="lastname"
                    value={profile.lastname}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="username"
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={profile.password1}
                    name="password1"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    name="password2"
                    value={profile.password2}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>{" "}
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Phone Number"
                    type="text"
                    value={profile.phone_number}
                    name="phone_number"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Birth-date: YEAR-MONTH-DAY"
                    type="text"
                    value={profile.birth_date}
                    name="birth_date"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>{" "}
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-pin-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Address"
                    type="text"
                    value={profile.address}
                    name="address"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>{" "}
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-briefcase-24" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Profession"
                    type="text"
                    value={profile.profession}
                    name="profession"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={submitForm}
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
