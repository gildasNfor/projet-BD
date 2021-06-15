// jshint esversion:6
import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Menu, MenuItem } from "@material-ui/core";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import axiosInstance from "../../axios";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { setAllUsers, setDetails } from "../../redux/actions/authActions";
import { setActiveTontine } from "../../redux/actions/tontineActions";
import { bindActionCreators } from "redux";
import Header from "components/Headers/Header.js";
import CustomizedDialogs from "./CustomizedDialogs.js";

const PageVisits = () => {
  return (
    <tr>
      <th scope="row">Tume Cadell</th>
      <td>4,569</td>
      <td>340</td>
      <td>
        <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
      </td>
    </tr>
  );
};

const UserDashboard = props => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  // const params = useParams();
  // console.log(params);
  const [tontineMembers, setTontineMembers] = useState([]);
  const [messages, setMessages] = useState([
    {
      subject: "football",
      message:
        "Lionel Andrés Messi is an Argentine professional footballer who plays as a forward and captains both Spanish club Barcelona and the Argentina national team.",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = e => {
    e.preventDefault();
    console.log("You typed >>>" + input);
    setInput("");
  };

  const Member = ({ first_name, last_name }) => {
    return (
      <>
        <div style={{ padding: "0.5px" }}>{`${first_name} ${last_name}`}</div>
        <hr />
      </>
    );
  };

  const MessageComponent = ({ properties }) => {
    const displaySwal = () => {
      return <CustomizedDialogs />;
    };
    return (
      <div onClick={displaySwal} className="others">
        <p>Subject: {properties.subject}</p>
      </div>
    );
  };

  useEffect(() => {
    const string = localStorage.getItem("active_tontine");
    const active_tontine = JSON.parse(string);
    console.log(active_tontine);
    props.setActiveTontine(active_tontine);

    axiosInstance
      .get(`/tontine-app/get-member-info/${active_tontine?.name}`)
      .then(res => {
        console.log(res.data);
        props.setDetails(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    axiosInstance
      .get(`/api/get-tontine-member-list/${active_tontine?.name}`)
      .then(res => {
        console.log(res.data);
        setTontineMembers(res.data);
        console.log(tontineMembers);
      })
      .catch(err => {
        console.log(err);
      });

    axiosInstance
      .get(`/tontine-app/get-messages/?tontine=${active_tontine?.name}`)
      .then(res => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/api/users`)
      .then(res => {
        console.log(res.data);
        props.setAllUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1"></h6>
                    <h2 className="text-white mb-0">User Options</h2>
                  </div>
                  <div className="col">
                    {/* <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={e => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={e => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav> */}
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="">
                  {/* <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  /> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Tontine
                    </h6>
                    <h2 className="mb-0">Members</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {tontineMembers.map((member, index) => (
                  <Member
                    key={index}
                    first_name={member.first_name}
                    last_name={member.last_name}
                  />
                ))}
              </CardBody>
            </Card>
          </Col>
          <Col style={{ maxHeight: "200px" }} xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Chat</h3>
                  </div>
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <div style={{ maxHeight: "200px" }} className="chat__body">
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>
                <p className={`chat__message ${false && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>{" "}
                <p className={`chat__message ${true && "chat__reciever"}`}>
                  <span className="chat__name">Ballack</span>Hey guys
                  <span className="chat__timestamp">3:15pm</span>
                </p>
              </div>
              <div className="chat__footer">
                {/* <InsertEmoticon /> */}
                <form>
                  <input
                    onChange={e => setInput(e.target.value)}
                    type="text"
                    placeholder="Type a message"
                    value={input}
                  />
                  <button type="submit" onClick={sendMessage}>
                    Send a message
                  </button>
                </form>
                {/* <MicIcon /> */}
              </div>
            </Card>
          </Col>
        </Row>

        <div className="note">
          {messages?.map((message, index) => (
            // <MessageComponent key={index} properties={message} />
            <CustomizedDialogs
              key={index}
              subject={message.subject}
              message={message.message}
            />
          ))}
        </div>

        {/* <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <PageVisits />
                </tbody>
              </Table>
            </Card>
          </Col> */}
        {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col> */}
        {/* </Row> */}
      </Container>
    </>
  );
};

const mapStateToProps = ({ auth, tontines }) => {
  return {
    currentUser: auth.user,
    allUsers: auth.allUsers,
    myTontines: tontines.myTontines,
    allTontines: tontines.allTontines,
    activeTontine: tontines.activeTontine,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setAllUsers, setActiveTontine, setDetails },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
