export const GetNews = (ticker) => {
    var url = 'http://newsapi.org/v2/everything?q=' + ticker + '&from=2021-02-20&to=2021-02-20&sortBy=popularity&apiKey=3f1d72ef8dd9413ab9ab611a9f4768b4'

    var jsonData = [];

    fetch(url)
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                for (let i = 0; i < 3; i++) {
                    let article = "article"+i;
                    jsonData[i] = [data[article].title, data[article].url];
                }
            });
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

    
    return jsonData;
}