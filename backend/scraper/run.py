from scrape.reddit_scraper import scrape
import os
import json
import time
import analyzer


def set_last_scanned():
    with open('last_scanned.json', 'w') as f:
        json.dump({'last_scanned': int(time.time())}, f)


def get_last_scanned() -> int:
    if os.path.exists("last_scanned.json"):
        with open("last_scanned.json", 'r') as f:
            return json.load(f)['last_scanned']

    return None


def get_stocks() -> set[str]:
    with open('stocks.json', 'r') as f:
        stocks = json.load(f)
    stock_symbols = [stock['ACT Symbol'] for stock in stocks]
    stock_symbols += [('$%s' % stock) for stock in stock_symbols]
    return set(stock_symbols)


# load stocks
stocks = get_stocks()

# load scraped reddit posts
posts, cached = scrape(get_last_scanned())
if not cached:
    set_last_scanned()

# analyze the text
analysis = analyzer.analyze(posts)

print(posts)
