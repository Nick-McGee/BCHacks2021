const BASE_URL = "http://127.0.0.1:5000/fetch?url="

const cached_fetch = url => {
    return fetch(BASE_URL + encodeURIComponent(url));
}

export default cached_fetch;