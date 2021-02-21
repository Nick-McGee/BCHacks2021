from scrape.reddit_scraper import scrape
import os
import json
import time
import analyzer
from typing import Union


def set_last_scanned():
    with open('last_scanned.json', 'w') as f:
        json.dump({'last_scanned': int(time.time())}, f)


def get_last_scanned() -> Union[int, None]:
    if os.path.exists("last_scanned.json"):
        with open("last_scanned.json", 'r') as f:
            return json.load(f)['last_scanned']

    return None


def get_stocks() -> set[str]:
    with open('stocks.json', 'r') as f:
        stocks = json.load(f)
    stock_symbols = [stock['ACT Symbol'] for stock in stocks if len(stock['ACT Symbol']) > 1]
    stock_symbols += [('$%s' % stock) for stock in stock_symbols]
    return set(stock_symbols)


def save(results):
    with open('results.json', 'w') as f:
        json.dump(results, f)


# load stocks
stocks = get_stocks()

# load scraped reddit posts
posts, cached = scrape(get_last_scanned())
print(len(posts))
if not cached:
    set_last_scanned()

# analyze the text
frequency_analysis = analyzer.analyze(posts, stocks)

sentiments = analyzer.sentiment_analysis(posts, stocks)


ans = {}
for ticker in sentiments:
    ans[ticker] = {'sentiment': sentiments[ticker], 'frequency': None}

for ticker in ans:
    if ticker in frequency_analysis:
        ans[ticker]['frequency'] = frequency_analysis[ticker]
    else:
        del ans[ticker]

save(ans)
