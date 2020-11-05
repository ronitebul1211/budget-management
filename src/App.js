import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
//Components
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import MonthManagerPage from "./pages/MonthManagerPage/MonthManagerPage";
import StatisticsAndDataPage from "./pages/StatisticsAndDataPage/StatisticsAndDataPage";
import SignInPage from "./pages/SignInPage/SignInPage";

const App = () => {
   return (
      <BrowserRouter>
         <Navbar />
         <div className="page-container">
            <Route path="/" exact component={HomePage} />
            <Route path="/current_month" exact component={MonthManagerPage} />
            <Route path="/statistics" exact component={StatisticsAndDataPage} />
            <Route path="/sign-in" exact component={SignInPage} />
         </div>
      </BrowserRouter>
   );
};
export default App;
