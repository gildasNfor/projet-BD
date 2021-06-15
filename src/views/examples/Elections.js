import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { updateVote } from "../../redux/actions/electionActions";
import axiosInstance from "../../axios";

// import Checkboxes from "./Checkboxes";
// import RadioButtonsGroup from "./RadioButtonsGroup";
import "./custom.css";

const Elections = ({ updateVote, vote_form }) => {
  const [members, setMembers] = useState({});
  useEffect(() => {
    localStorage.setItem(
      "vote_form",
      JSON.stringify({
        president: "",
        treasurer: "",
        secretary: "",
        assistant_secretary: "",
        auditor: "",
        assistant_auditor: "",
      })
    );

    axiosInstance
      .get("polls/vote/get_election_members/2/")
      .then(res => {
        console.log(res.data);
        setMembers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(members);
  }, []);

  const VotingBox = ({ post, name }) => {
    return (
      <Card className=" election__card">
        <div>{post}</div>
        <hr />
        <Candidate name={name ? name : "Ballack"} post={post} />
        <Candidate name="Flash" post={post} />
        <Candidate name="None" post={post} />
      </Card>
    );
  };

  const Candidate = ({ post, name }) => {
    const handleClick = event => {
      const { name, id } = event.target;

      const newForm = {
        ...JSON.parse(localStorage.getItem("vote_form")),
        [name]: id === "None" ? "" : id,
      };
      localStorage.setItem("vote_form", JSON.stringify(newForm));
      console.log(localStorage.getItem("vote_form"));
      let form = localStorage.getItem("vote_form");
      form = JSON.parse(form);
      console.log(form);
    };

    return (
      <div className="candidate">
        <p className="picture">
          <Avatar />
        </p>{" "}
        <p className="candidate__name">{name}</p>
        <p className="checkbox">
          {/* <Checkboxes name="Senior Prefect" /> */}
          <input onClick={handleClick} id={name} type="radio" name={post} />
          <label for={name}></label>
        </p>
      </div>
    );
  };

  const submitResults = event => {
    event.preventDefault();
  };

  return (
    <>
      <VotingBox post="president" name={members.president} />
      <VotingBox post="treasurer" name={members.treasurer} />
      <VotingBox post="secretary" name={members.secretary} />
      <VotingBox post="assistant_secretary" name={members.assitant_secretary} />
      <VotingBox post="auditor" name={members.auditor} />
      <VotingBox post="assistant_auditor" name={members.asistant_auditor} />

      <div className="vote__div">
        <button className="btn btn-success vote__btn" onClick={submitResults}>
          Submit Vote
        </button>
      </div>
    </>
  );
};

// const mapStateToProps = ({ elections }) => {
//   return {
//     vote_form: elections.vote_form,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ updateVote }, dispatch);
// };
export default Elections;
