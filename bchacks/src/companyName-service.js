export const getCompanyName = (ticker) => {
    var url = 'http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=' + ticker + '&region=1&lang=en'

    return fetch(url)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            return response.json()
        })
        .then(json => {
            return(json['ResultSet']['Result'][0]['name']);
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}