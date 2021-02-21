import React, { Component } from "react";
import logo from './logo.svg';
import Header from './components/header';
import GraphData from './components/graphData';
import './App.css';
import WsbImage from './images/wsb.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import { GraphDataArray } from './graph';
import { NewsArray } from './news';
import { GetNews } from './news-service';

const newarray = GetNews('GME');

console.log(newarray[0]);

const stockArray= [
  {  
  stockClass: 'good',
  ticker: 'GME',
  companyname: 'Gamestop Inc',
  highvalue: '53.37 USD',
  lowvalue: '38.60 USD',
  sentimentcount: '7,234',
  graphdatarray: GraphDataArray,
  newsarray: NewsArray
  }
]


function App() {
  return (
    <div className="main">
      <Header
        header="Wall Street Bets Sentimental Analysis" 
        parag="Using sentimental analysis, we analyze what stocks the users on r/wallstreetbets are talking about"
        imgsrc={WsbImage}
      />
      {stockArray.map(stock => <GraphData stockClass={stock.stockClass}  ticker={stock.ticker} companyname={stock.companyname} highvalue={stock.highvalue} lowvalue={stock.lowvalue} sentimentcount={stock.sentimentcount} graphdatarray={stock.graphdatarray} newsarray={stock.newsarray}/>)}
      
    </div>
  );
}
// stockClass is used for the class that will decide whether a stock is doing well or not by changing the color to either green or red

export default App;
