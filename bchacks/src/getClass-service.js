export const getStockClass = (sentiment) => {

    classArray = ['good','bad'];
    stockClass = '';

    if (sentiment > 0) {
        stockClass = classArray[0];
    } else if (sentiment < 0) {
        stockClass = classArray[1];
    }
    return stockClass;

}