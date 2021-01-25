import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import PrivateRoute from './auth/PrivateRoute';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import MonthManagerPage from './pages/MonthManagerPage/MonthManagerPage';
import StatisticsAndDataPage from './pages/StatisticsAndDataPage/StatisticsAndDataPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
   const { isLoading } = useAuth0();
   if (isLoading) {
      return <Loader />;
   }

   return (
      <div>
         <Navbar />
         <div className="page-container">
            <Switch>
               <PrivateRoute path="/current-month" component={MonthManagerPage} />
               <PrivateRoute path="/statistics" component={StatisticsAndDataPage} />
               <Route path="/test/current-month" exact component={MonthManagerPage} />
               <Route path="/test/statistics" exact component={StatisticsAndDataPage} />
               <Route path="/" exact component={HomePage} />
               <Route path="*" exact component={NotFoundPage} />
            </Switch>
         </div>
      </div>
   );
};
export default App;
