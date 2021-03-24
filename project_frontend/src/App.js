import './App.css';
import Center from './components/Center';
import React, { useEffect, useState} from 'react'

function App() {
  const [username, setUsername] = useState('bruno')
  useEffect(() => {
    const fetchdata = async () => {
      await fetch('http://127.0.0.1:8000/users/')
      .then(response => response.json())
      .then(response => {console.log(response);
        setUsername(response.results[1].username)
      })
    }
    fetchdata();
  },[]);

  useEffect(() => {
    const post = async () => {
      const response = await fetch('http://127.0.0.1:8000/tontines/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        name: "Gildas",
        slogan: "God's Great"})
      });
      let result = await response.json();
      console.log(result);
    }
    post();
  },[]);


  return (
    <div>
      <Center username = {username} />
    </div>
  );
}

export default App;
