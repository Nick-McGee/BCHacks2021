import os
import time

import requests
from flask import Flask, request, make_response
from flask_cors import CORS
import json
import hashlib
import requestChartData2

app = Flask(__name__)
CORS(app)


def error(msg):
    return make_response('{"error": "%s"}' % msg, 500)


@app.route('/top5')
def top_5_stox():
    data = None
    with open('scraper/results.json', 'r') as f:
        data = json.load(f)

    temp = []
    for key in data:
        temp.append([key, {'sentiment': data[key]['sentiment'], 'frequency': data[key]['frequency']}])

    sorted(temp, key=lambda x: x[1]['frequency'])
    temp = temp[:5]

    ans = []
    for x in temp:
        ans.append({x[0]: x[1]})

    return json.dumps(ans)
    # return json.dumps([
    #     {'GME': {'sentiment': 0.67, 'frequency': 1242}},
    #     {'AMC': {'sentiment': 0.75, 'frequency': 756}},
    #     {'EXPR': {'sentiment': 0.89, 'frequency': 647}},
    #     {'NOK': {'sentiment': 0.72, 'frequency': 423}},
    #     {'KOSS': {'sentiment': 0.82, 'frequency': 211}}
    # ])

@app.route('/getChartData', methods=['POST'])
def getChartData():
    data = request.data.decode('utf-8')

    chartData = requestChartData2.getData(data, 'TIME_SERIES_DAILY', '5min')
    print(jsonfiy(chartData))

    return jsonify(chartData)


def get_cache(path: str, check_ttl: bool):
    with open(path, 'r') as f:
        data = json.loads(f.read())
        if not check_ttl:
            return data['response']
        if data['ttl'] > int(time.time()):
            return data['response']

    return None


def set_cache(url, path, resp):
    with open(path, 'w') as f:
        json.dump(
            {"url": url, "ttl": int(time.time()) + 7200, "response": resp.decode('utf-8')}, f
        )


def get_url(url):
    r = requests.get(url)
    return r.content, r.status_code


@app.route('/fetch')
def cached():
    if 'url' in request.args:
        url = request.args.get('url')
        url_hash = hashlib.md5(url.encode()).hexdigest()
        cache_path = "cache/%s.json" % url_hash

        # try to send cache
        if os.path.exists(cache_path):
            print("HIT CACHE")
            data = get_cache(cache_path, check_ttl=True)
            if data:
                return data

        try:
            resp, code = get_url(url)
        except Exception as e:
            return error(str(e))

        if code != 200:
            if not os.path.exists(cache_path):
                return error("Cannot request URL")
            else:
                return get_cache(cache_path, check_ttl=False)

        set_cache(url, cache_path, resp)

        return resp

    return error("No URL parameter provided")


def init():
    if not os.path.exists("cache/"):
        os.mkdir("cache")


if __name__ == "__main__":
    init()
    app.run()
