import React, {useState} from "react";
import Header from './components/header';
import GraphData from './components/graphData';
import './App.css';
import WsbImage from './images/wsb.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import { GetNews } from "./news-service";

const stockArray= [
  {  
  stockClass: 'good',
  ticker: 'GME',
  sentimentcount: '7,234',
  graphdatarray: 0
  }
]


function App() {

  const [news, setNews] = useState([]);
  if(news.length === 0) GetNews("GME").then(result => setNews(result));
  if(news.length > 0) console.log(news);
  return (
    <div className="main">
      <Header
        header="Wall Street Bets Sentimental Analysis" 
        parag="Using sentimental analysis, we analyze what stocks the users on r/wallstreetbets are talking about"
        imgsrc={WsbImage}
      />
      {stockArray.map(stock => <GraphData stockClass={stock.stockClass}  ticker={stock.ticker} sentimentcount={stock.sentimentcount} graphdatarray={stock.graphdatarray}/>)}
      
    </div>
  );
}
// stockClass is used for the class that will decide whether a stock is doing well or not by changing the color to either green or red

export default App;
