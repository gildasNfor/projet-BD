// jshint esversion: 6
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

const CreateTontine = ({ setUser, currentUser }) => {
  const history = useHistory();
  const [newTontine, setnewTontine] = useState({
    name: "",
    created_by: currentUser?.pk,
    slogan: "",
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setnewTontine(newTontine => {
      return { ...newTontine, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosInstance
      .post("/api/tontines/", newTontine)
      .then(res => {
        console.log(res);
        history.pushState("/auth/my-tontines");
      })
      .catch(res => {
        console.log(res.detail);
      });
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Create a Tontine</small>
            </div>
            {/* <div className="btn-wrapper text-center">
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
            </div> */}
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div> */}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Tontine Name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={newTontine.name}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-copy-04" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Slogan"
                    type="text"
                    name="slogan"
                    onChange={handleChange}
                    value={newTontine.slogan}
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Create Tontine
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTontine);
