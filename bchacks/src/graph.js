export const makeGraph = async (ticker) => {

  try {
    const response = await fetch("http://localhost:5000/getChartData", {
      method: "POST",
      body: ticker
    }); 
    const serverReturn = await response.text();

    console.log(serverReturn);
  }
  catch (err) {
    console.log(err);
  }

  let pointsMade = [
      ['2/3/2015', 99.18, 100.27, 99.04, 100.01],
      ['2/6/2015', 99.96, 100, 99.34, 99.49],
      ['2/7/2015', 99.57, 101.18, 99.56, 100.91],
      ['2/8/2015', 101.12, 101.29, 99.6, 100.05]
  ]

  const graphData = {
      debug: false,
      type: 'candlestick',
      palette: 'fiveColor18',
      legend: {
        template: '',
        position: ''
      },
      yAxis: {
        formatString: 'c',
      },
      xAxis_crosshair_enabled: true,
      defaultPoint: {
        outline_width: 0,
        altColor: '#ff4734',
        color: '#33ae5b',
        subvalue_line_color: '#555',
      },
      xAxis_scale_type: 'time',
      series: [
        {
          name: '',
          points: pointsMade
        }
      ]
  };

  return graphData;
}