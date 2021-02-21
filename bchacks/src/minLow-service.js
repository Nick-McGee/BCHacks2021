import cached_fetch from './Api';

export const getLowHigh = (ticker) => {
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ticker + '&apikey=46C5ZW2US27WT7FY'

    return cached_fetch(url)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            return response.json()
        })
        .then(json => {
            let date = '';
            let max = 0;
            let min = 1000000;

            for(let i = 0; i < 7; i++) {
                var today = new Date();
                today.setDate(today.getDate() - i);
                var dd = today.getDate();
                var mm = today.getMonth()+1; 
                var yyyy = today.getFullYear();
                if(dd<10) {dd='0'+dd;} 
                if(mm<10){mm='0'+mm;}
                date = yyyy+'-'+mm+'-'+dd;

                try {
                    max = Math.max(max, json['Time Series (Daily)'][date]['2. high']);
                    min = Math.min(min, json['Time Series (Daily)'][date]['3. low']);
                }
                catch (err){
                    // console.log("market closed on " + date);
                }
            }

            let minMax = [min, max];
            return minMax;
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}