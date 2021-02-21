import React, { Component } from "react";
import Header from './components/header';
import GraphData from './components/graphData';
import './App.css';
import WsbImage from './images/wsb.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import { GraphDataArray } from './graph';

 /*const stockArray= [
  {  
  stockClass: 'good',
  ticker: 'GME',
  companyname: 'Gamestop Inc',
  highvalue: '53.37 USD',
  lowvalue: '38.60 USD',
  sentimentcount: '7,234',
  graphdatarray: GraphDataArray
  }
]*/

class App extends Component {
  state = { 
    stockArray: [
      {  
      stockClass: 'good',
      ticker: 'GME',
      companyname: 'Gamestop Inc',
      highvalue: '53.37 USD',
      lowvalue: '38.60 USD',
      sentimentcount: '7,234',
      graphdatarray: GraphDataArray
      }
    ]    
  }

  /*async componentDidMount() {
    const url= "https://api.randomuser.me/";
    const response = await fetch(url);
    this.setState({stockArray: response});
  }*/

  render() {
  
    const { stockArray } = this.state
    return (
      <div className="main">
      <Header
        header="Wall Street Bets Sentimental Analysis" 
        parag="Using sentimental analysis, we analyze what stocks the users on r/wallstreetbets are talking about"
        imgsrc={WsbImage}
      />
      {//stockArray.map(stock => <GraphData stockClass={stock.stockClass}  ticker={stock.ticker} companyname={stock.companyname} highvalue={stock.highvalue} lowvalue={stock.lowvalue} sentimentcount={stock.sentimentcount} graphdatarray={stock.graphdatarray}/>)}
      }
      {stockArray.map(stock => <GraphData stockClass={stock.stockClass}  ticker={stock.ticker} companyname={stock.companyname} highvalue={stock.highvalue} lowvalue={stock.lowvalue} sentimentcount={stock.sentimentcount} graphdatarray={stock.graphdatarray}/>)}
    </div>
    );
  }
}


// stockClass is used for the class that will decide whether a stock is doing well or not by changing the color to either green or red

export default App;
