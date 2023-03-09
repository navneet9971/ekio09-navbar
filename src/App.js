import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./component/auth/Login";
import ErrorPage from "./component/errorPage";
import View from "./component/pages/View";
import Add from "./component/pages/Add";
import Review from "./component/pages/Review";
import Myaccount from "./component/pages/Myaccount";
import Download from "./component/pages/Download";
import Check from "./component/pages/Check";
import SignUP from "./component/auth/SignUP";
import Firstpage from "./pages/Firstpage";
import Secondpage from "./pages/Secondpage";
import Thirdpage from "./pages/Thirdpage";
import ClientDashboard from "./pages/client-dashbord/Clientdashboard";
import Navbar from "./pages/Navbar/Navbar";


const App = () => {
  const router = (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/signup">
          <SignUP />
        </Route>

        <Route path="/navbar">
         <Navbar />
        <Switch>
        <Route path="/navbar/clientdashboard">
          <ClientDashboard />
        </Route>
        <Route path="/navbar/firstpage">
          <Firstpage />
        </Route>
        <Route path="/navbar/secondpage">
          <Secondpage />
        </Route>
        <Route path="/navbar/compliance/:id">
          <Thirdpage />
        </Route>
        
        <Route path="/navbar/firstpage">
              <Firstpage />
            </Route>
            <Route path="/navbar/add">
              <Add />
            </Route>
            <Route path="/navbar/review">
              <Review />
            </Route>
            <Route path="/navbar/check">
              <Check />
            </Route>
            <Route path="/navbar/download">
              <Download />
            </Route>
            <Route path="/navbar/myaccount">
              <Myaccount />
            </Route>
            <Route path="/navbar/view">
              <View />
            </Route>
            
        </Switch>
        </Route>

        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );

  return router;
};

export default App;
