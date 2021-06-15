//jshint esversion:6
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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
// import MicIcon from "@material-ui/icons/Mic";
// import { InsertEmoticon } from "@material-ui/icons";
import axiosInstance from "../axios";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { setAllUsers, setDetails } from "../redux/actions/authActions";
import { setActiveTontine } from "../redux/actions/tontineActions";
import { bindActionCreators } from "redux";
import Header from "components/Headers/Header.js";
import "./examples/custom.css";

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

const Index = props => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const { tontine } = useParams();
  const [text, setText] = useState({
    subject: "",
    message: "",
  });
  const [joinRequests, setRequests] = useState([]);
  const [receiver, setReceiver] = useState("All");
  const [tontineMembers, setTontineMembers] = useState([]);
  const [memberSelected, setMemberSelected] = useState(
    "Click here to select a member"
  );
  const [invite, setInvite] = useState({
    message: "",
  });
  const [pk, setPk] = useState();

  const [open, setOpen] = React.useState(false);

  const handleListClick = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handlenewClick = event => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPk = primaryKey => {
    setPk(primaryKey);
    console.log(pk);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setInvite(invite => {
      return { ...invite, [name]: value };
    });
  };

  const sendRequest = e => {
    e.preventDefault();
    axiosInstance
      .post(`tontine-app/invite-member/`, {
        ...invite,
        user_pk: pk,
        tontine_name: props.activeTontine?.name,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const User = userProps => {
    const handleClick = e => {
      e.preventDefault();
      userProps.getPk(userProps.pk);
      setMemberSelected(`${userProps.first_name} ${userProps.last_name}`);
    };
    return (
      <div onClick={handleClick}>
        <p>{`${userProps.first_name} ${userProps.last_name}`}</p>
      </div>
    );
  };

  const Requests = ({ first_name, last_name, pk }) => {
    const acceptRequest = e => {
      e.preventDefault();
      axiosInstance
        .post(`/tontine-app/accept-request/`, {
          user_pk: pk,
          tontine_name: props.activeTontine.name,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
    return (
      <div>
        <p>{`${first_name} ${last_name}`}</p>
        <button onClick={acceptRequest} className="btn btn-primary">
          Accept
        </button>
        <button className="btn btn-danger">Decline</button>
      </div>
    );
  };

  const Member = ({ first_name, last_name, username }) => {
    return (
      <>
        <div
          onClick={() => {
            setReceiver(username);
            setOpen(!open);
          }}
          style={{ padding: "0.5px" }}
        >{`${first_name} ${last_name}`}</div>
        <hr />
      </>
    );
  };

  const updateMessage = e => {
    const { name, value } = e.target;
    setText(text => {
      return { ...text, [name]: value };
    });
  };

  const sendMessageToOneOrMany = e => {
    e.preventDefault();

    axiosInstance
      .post(`tontine-app/send-message/`, {
        ...text,
        send_to: receiver,
        tontine: props.activeTontine?.name,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    setText({
      subject: "",
      message: "",
    });
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
      .get(`/tontine-app/get-join-requests/${active_tontine?.name}`)
      .then(res => {
        console.log(res.data);
        const sort = res.data.map(req => req.sent_from);
        // console.log(sort);
        setRequests(sort);
        // console.log(joinRequests);
        // setRequests(joinRequests => {
        //   return [...joinRequests, ...res.data.map(req => req.sent_from)];
        // });
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
              <CardHeader
                style={{ backgroundColor: "grey" }}
                className="bg-transparent header"
              >
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1"></h6>
                    <h2 className="text-white mb-0">Admin Options</h2>
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
                  <div>
                    Send Message{" "}
                    <ListItem button onClick={handleListClick}>
                      <ListItemText primary={receiver} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem button>
                          <div
                            onClick={() => {
                              setReceiver("all");
                            }}
                          >
                            All
                          </div>
                        </ListItem>
                        {tontineMembers?.map((member, index) => (
                          <ListItem button>
                            <Member
                              key={index}
                              first_name={member.first_name}
                              last_name={member.last_name}
                              username={member.username}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                    <br />
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    onChange={updateMessage}
                    value={text.subject}
                  />
                  <br />
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Message"
                    name="message"
                    onChange={updateMessage}
                    value={text.message}
                  />
                  <br />
                  <button
                    onClick={sendMessageToOneOrMany}
                    className="btn btn-outline-secondary"
                  >
                    Send Message
                  </button>

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
                      Accept or Decline
                    </h6>
                    <h2 className="mb-0"> Requests</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="">
                  {props.allUsers?.map(
                    (user, index) =>
                      joinRequests.indexOf(user.pk) !== -1 && (
                        <Requests
                          key={index}
                          first_name={user.first_name}
                          last_name={user.last_name}
                          pk={user.pk}
                        />
                      )
                  )}
                  <div>
                    <h2 className="mb-0">Invite a member</h2>
                    {/* <input
                      className="form-control"
                      placeholder="Email"
                      onChange={handleChange}
                      name="email"
                      value={invite.email}
                    /> */}
                    {/* <br /> */}
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      {memberSelected}
                    </Button>
                    <br />

                    <Menu
                      style={{ maxHeight: "400px" }}
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {props.allUsers?.map((user, index) => (
                        <MenuItem onClick={handleClose}>
                          <User
                            key={index}
                            first_name={user.first_name}
                            last_name={user.last_name}
                            pk={user.pk}
                            getPk={getPk}
                          />
                        </MenuItem>
                      ))}
                    </Menu>
                    <input
                      style={{ marginTop: "10px" }}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Invitation Message"
                      name="message"
                      value={invite.message}
                    />
                    <br />
                    <button
                      onClick={sendRequest}
                      className="btn btn-outline-dark"
                    >
                      Invite
                    </button>
                  </div>
                  {/* <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  /> */}
                </div>
              </CardBody>
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
export default connect(mapStateToProps, mapDispatchToProps)(Index);
