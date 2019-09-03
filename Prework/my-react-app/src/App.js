import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import HomePage from "./components/HomePage";
import LogIn from "./components/LogIn";
import CreateAccount from "./components/CreateAccount";
import Characters from "./components/Characters";


function App() {
  return (
    <div className="App">
      <HomePage/>
    </div>
  );
}

export default App;
