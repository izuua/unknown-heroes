import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import HomePage from "./components/pages/HomePage";
import LogIn from "./components/pages/LogIn";
import CreateAccount from "./components/pages/CreateAccount";
import Characters from "./components/pages/Characters";


function App() {
  return (
    <Router>
      <div>
        <NavTabs />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/createaccount" component={CreateAccount} />
      </div>
    </Router>
  )
  // if (loggedIn) {
  //   return (
  //     <Router>
  //       <div>
  //         <NavTabs />
  //         <Route exact path="/" component={HomePage} />
  //         <Route exact path="/login" component={LogIn} />
  //         <Route exact path="/createaccount" component={CreateAccount} />
  //         <Route exact path="/characters" component={Characters} />
  //       </div>
  //     </Router>
  //   )
  // } else {
  //   return (
  //     <Router>
  //       <div>
  //         <NavTabs />
  //         <Route exact path="/" component={HomePage} />
  //         <Route exact path="/login" component={LogIn} />
  //         <Route exact path="/createaccount" component={CreateAccount} />
  //       </div>
  //     </Router>
  //   )
  // };
}

export default App;
