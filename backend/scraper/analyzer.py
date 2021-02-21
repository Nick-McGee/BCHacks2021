import asyncio

import nltk

from scrape.reddit_scraper import Post
from nltk.corpus import stopwords
nltk.download('stopwords')
from nltk.tokenize import word_tokenize


async def get_tokens(text: str) -> list[str]:
    return [word for word in word_tokenize(text) if not word in stopwords.words()]


async def search_tickers(tokens: list[str], tickers: set[str]) -> map:
    results = {}
    for token in tokens:
        if token in tickers:
            ticker = token[1:] if token.startswith("$") else token
            results[ticker] = results[ticker]+1 if ticker in results else 1

    return results


def aggregate(result: map, tickers_analysis: map):
    for ticker in tickers_analysis:
        result[ticker] = result[ticker]+1 if ticker in result else 1


def analyze(posts: list[Post], tickers: set[str]):
    result = {}
    loop = asyncio.get_event_loop()

    for post in posts:
        title_tokens, body_tokens = loop.run_until_complete(
            asyncio.gather(get_tokens(post.title), get_tokens(post.text))
        )
        title_tickers_routine = search_tickers(title_tokens, tickers)
        body_tickers_routine = search_tickers(body_tokens, tickers)
        title_tickers, body_tickers = loop.run_until_complete(
            asyncio.gather(title_tickers_routine, body_tickers_routine)
        )

        # comments
        comment_tokens_routines = [get_tokens(comment.text) for comment in post.comments]
        comment_tokens = loop.run_until_complete(asyncio.gather(*comment_tokens_routines))

        comment_tickers_routines = [search_tickers(comment_token, tickers) for comment_token in comment_tokens]
        comment_tickers = loop.run_until_complete(asyncio.gather(*comment_tickers_routines))
        aggregate(result, title_tickers)
        aggregate(result, body_tickers)
        for comment_ticker in comment_tickers:
            aggregate(result, comment_ticker)

    print(result)
