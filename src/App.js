import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
//Components
import Header from "./components/Header/Header";
import MonthManagerPage from "./pages/MonthManagerPage/MonthManagerPage";
import HomePage from "./pages/HomePage/HomePage";
import StatisticsAndDataPage from "./pages/StatisticsAndDataPage/StatisticsAndDataPage";

const App = () => {
   return (
      <BrowserRouter>
         <Header />
         <div className="page-container">
            <Route path="/" exact component={HomePage} />
            <Route path="/current_month" exact component={MonthManagerPage} />
            <Route path="/statistics" exact component={StatisticsAndDataPage} />
         </div>
      </BrowserRouter>
   );
};
export default App;
