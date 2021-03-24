import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import SignUp from './components/SignUp';
import SignIn from "./components/SignIn";

function App() {
  return (
    <div>
      <Router>
        <Switch>
        <Route path="/" exact="exact" component={SignUp} />
        <Route path="/signin" exact="exact" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;






















































// const [username, setUsername] = useState('bruno')
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     await fetch('http://127.0.0.1:8000/users/')
  //     .then(response => response.json())
  //     .then(response => {console.log(response);
  //       setUsername(response.results[1].username)
  //     })
  //   }
  //   fetchdata();
  // },[]);

  // useEffect(() => {
  //   const post = async () => {
  //     const response = await fetch('http://127.0.0.1:8000/tontines/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: JSON.stringify({
  //       name: "Gildas",
  //       slogan: "God's Great"})
  //     });
  //     let result = await response.json();
  //     console.log(result);
  //   }
  //   post();
  // },[]);
