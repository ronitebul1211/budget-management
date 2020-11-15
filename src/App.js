import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

//Components
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import MonthManagerPage from "./pages/MonthManagerPage/MonthManagerPage";
import StatisticsAndDataPage from "./pages/StatisticsAndDataPage/StatisticsAndDataPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/_Auth/PrivateRoute";

const App = () => {
   return (
      <React.Fragment>
         <Navbar />
         <div className="page-container">
            <Switch>
               <PrivateRoute path="/current_month" component={MonthManagerPage} />
               <PrivateRoute path="/statistics" component={StatisticsAndDataPage} />
               <Route path="/" exact component={HomePage} />
               <Route path="*" exact component={NotFoundPage} />
            </Switch>
         </div>
      </React.Fragment>
   );
};
export default App;
