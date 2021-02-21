from scrape.reddit_scraper import scrape
import os
import json
import time


def set_last_scanned():
    with open('last_scanned.json', 'w') as f:
        json.dump({'last_scanned': int(time.time())}, f)


def get_last_scanned():
    if os.path.exists("last_scanned.json"):
        with open("last_scanned.json", 'r') as f:
            return json.load(f)['last_scanned']

    return None


posts = scrape(get_last_scanned())
set_last_scanned()
print(posts)
