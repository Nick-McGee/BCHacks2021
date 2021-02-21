export const GetNews = (ticker) => {
    var url = 'http://newsapi.org/v2/everything?q=' + ticker + '&from=2021-02-20&to=2021-02-20&sortBy=popularity&apiKey=3f1d72ef8dd9413ab9ab611a9f4768b4'

    var jsonData = [];

    return fetch(url)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            return response.json()
        })
        .then(json => {
            for (let i = 0; i < 3; i++) {
                jsonData[i] = [json.articles[i].title, json.articles[i].url]
            }
            return jsonData;
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}