import React, { Component } from "react";
import logo from './logo.svg';
import Header from './components/header';
import GraphData from './components/graphData';
import './App.css';
import WsbImage from './images/wsb.jpeg'
import 'bootstrap/dist/css/bootstrap.css';



function App() {
  return (
    <div className="main">
      <Header
        header="Wall Street Bets Sentimental Analysis" 
        parag="Using sentimental analysis, we analyze what stocks the users on r/wallstreetbets are talking about"
        imgsrc={WsbImage}
      />
      <GraphData stockClass='good' ticker='GME' companyname='Gamestop Inc' highvalue='53.37 USD' lowvalue='38.60 USD' sentimentcount='7,234'/>
    </div>
  );
}
// stockClass is used for the class that will decide whether a stock is doing well or not by changing the color to either green or red

export default App;
