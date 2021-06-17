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
import db from "../../firebase/firebase";
import firebase from "firebase";
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
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState("");
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState({});
  const [noRoom, setNoRoom] = useState(0);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [loanInfo, setLoanInfo] = useState({
    amount: "",
    reason: "",
  });
  const [accountNumber, setAccountNumber] = useState();
  const [funds, setFunds] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [accountMessage, setAccountMessage] = useState("");

  const updateLoanForm = event => {
    const { name, value } = event.target;
    setLoanInfo(info => {
      return { ...info, [name]: value };
    });
  };

  const changeAmount = e => {
    const { value } = e.target;
    setAmount(value);
  };

  const sendMessage = e => {
    e.preventDefault();

    const tontineId = JSON.parse(
      localStorage.getItem("active_tontine")
    ).tontineId;

    const date = new Date();
    db.collection("rooms")
      .doc(tontineId)
      .collection("messages")
      .add({
        message: input,
        name: props.currentUser.username,
        timestamp: date.toLocaleTimeString("en-US", { hour12: false }),
        // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
    const div = document.querySelectorAll(".chat__body")[0];
    div.scrollTop = div.scrollHeight;
  };

  const Member = ({ first_name, last_name }) => {
    return (
      <>
        <div style={{ padding: "0.5px" }}>{`${first_name} ${last_name}`}</div>
        <hr />
      </>
    );
  };

  const fundsAndContributions = info => {
    return (
      <div>
        <span>Gods speed</span>
        <button>contribute</button>
      </div>
    );
  };

  const MessageComponent = ({ properties }) => {
    const displaySwal = () => {
      return <CustomizedDialogs />;
    };
    return (
      <div onClick={displaySwal} className="others">
        <p className="others">Subject: {properties.subject}</p>
      </div>
    );
  };

  const topUp = () => {
    axiosInstance
      .post(`/finance/get-account/`, {
        pk_tontine: props.activeTontine.id,
        pk_owner: props.currentUser.pk,
      })
      .then(res => {
        console.log(res);
        setAccountNumber(res.data.pk);
        document.getElementById("topup_form").classList.remove("invisible");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createAccount = () => {
    axiosInstance
      .post(`/finance/accounts/`, {
        tontine: props.activeTontine.id,
        user: props.currentUser.pk,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const submitTopup = () => {
    axiosInstance
      .post(`/finance/top-up/`, { pk: accountNumber, amount: amount })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    axiosInstance
      .get(`/finance/get-balance/${accountNumber}`)
      .then(res => {
        console.log(res.data);
        setBalance(res.data.balance);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const string = localStorage.getItem("active_tontine");
    const active_tontine = JSON.parse(string);
    console.log(active_tontine);
    props.setActiveTontine(active_tontine);
    setNoRoom(0);

    axiosInstance
      .get(`/tontine-app/get-member-info/${active_tontine?.name}`)
      .then(res => {
        props.setDetails(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    axiosInstance
      .get(`/api/get-tontine-member-list/${active_tontine?.name}`)
      .then(res => {
        setTontineMembers(res.data);
        console.log(tontineMembers);
      })
      .catch(err => {
        console.log(err);
      });

    axiosInstance
      .get(`/tontine-app/get-messages/?tontine=${active_tontine?.name}`)
      .then(res => {
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
        props.setAllUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    db.collection("rooms").onSnapshot(snapshot => {
      setRooms(
        snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
    if (localStorage.getItem("active_tontine")) {
      const tontineName = JSON.parse(
        localStorage.getItem("active_tontine")
      ).name;

      const list = rooms.filter(room => room.name === tontineName);

      if (!list) {
        db.collection("rooms").add({ name: tontineName });
      } else {
        setActiveRoom(list[0]);
      }
    }
    if (
      activeRoom &&
      !JSON.parse(localStorage.getItem("active_tontine"))?.tontineId
    ) {
      let tontine = JSON.parse(localStorage.getItem("active_tontine"));
      tontine = { ...tontine, tontineId: activeRoom.id };
      localStorage.setItem("active_tontine", JSON.stringify(tontine));
    }
    if (!JSON.parse(localStorage.getItem("active_tontine")).tontineId)
      setNoRoom(noRoom + 1);
    // if (!activeRoom) setNoRoom(noRoom + 1);
  }, [noRoom]);
  useEffect(() => {
    const tontineId = JSON.parse(
      localStorage.getItem("active_tontine")
    )?.tontineId;
    console.log(tontineId);
    if (tontineId) {
      db.collection("rooms")
        .doc(tontineId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot =>
          setChatMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
  }, [noRoom]);

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
                  {/* <div className="col">
                    <Nav className="justify-content-end" pills>
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
                    </Nav>
                  </div> */}
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="note">
                  <h1>Account details</h1>
                  <h3>{balance}</h3>
                  <button className="btn btn-primary" onClick={createAccount}>
                    Create Account
                  </button>
                  <hr />
                  <button className="btn btn-primary" onClick={topUp}>
                    Top Up
                  </button>
                </div>
                {/*  */}
                <div id="topup_form" className="note ">
                  <h1>Enter Info</h1>
                  <hr />
                  <input
                    onChange={changeAmount}
                    className="form-control"
                    placeholder="Enter Amount"
                    value={amount}
                  ></input>
                  <hr />
                  <button
                    style={{ marginTop: "35px" }}
                    className="btn btn-success"
                    onClick={submitTopup}
                  >
                    Top Up
                  </button>
                </div>
                {/*  */}
                <div className="note">
                  <h1>Request A Loan</h1>
                  <h3>Fill the Application to request a Loan</h3>
                  <input
                    onChange={updateLoanForm}
                    className="form-control"
                    placeholder="Enter Amount"
                    name="amount"
                    value={loanInfo.amount}
                  ></input>
                  <hr />
                  <input
                    onChange={updateLoanForm}
                    className="form-control"
                    placeholder="Enter Reason"
                    name="reason"
                    value={loanInfo.reason}
                  ></input>
                  <hr />
                  <button
                    className="btn btn-outline-primary"
                    onClick={submitTopup}
                  >
                    Request
                  </button>
                </div>
                {/*  */}
                <div className="note">
                  <h1>Funds</h1>
                  <h3>Contribute to a fund</h3>
                  {funds.map(fund => (
                    <fundsAndContributions />
                  ))}
                </div>
                {/*  */}
                <div className="note">
                  <h1>Contributions</h1>
                  <h3>Make a Contribution</h3>
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
                {chatMessages.map(message => (
                  <p
                    className={`chat__message ${
                      message.name === props.currentUser?.username &&
                      "chat__reciever"
                    }`}
                  >
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                      {message.timestamp.slice(0, 5)}
                    </span>
                  </p>
                ))}
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
          <Col>
            <Card>
              <div className="note others">
                {messages?.map((message, index) => (
                  // <MessageComponent key={index} properties={message} />
                  <CustomizedDialogs
                    key={index}
                    subject={message.subject}
                    message={message.message}
                  />
                ))}
              </div>
            </Card>
          </Col>
        </Row>

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
