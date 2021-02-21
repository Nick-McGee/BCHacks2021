import asyncio
from concurrent.futures.thread import ThreadPoolExecutor

import nltk
from google.cloud import language_v1
from ratelimit import sleep_and_retry, limits

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


def analyze(posts: list[Post], tickers: set[str]) -> map:
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

    return result


class TickerSentiment:
    def __init__(self, ticker, sentiment):
        self.ticker = ticker
        self.sentiment = sentiment


def sentiment_analysis(posts: list[Post], tickers: set[str]) -> map:
    inputs = []
    inputs.extend([post.title for post in posts])
    inputs.extend([post.text for post in posts])
    for post in posts:
        inputs.extend([comment.text for comment in post.comments])

    sentimenter = Sentimenter(tickers)
    sentiments = sentimenter.analyze(inputs)
    result = {}
    for sentiment in sentiments:
        if not sentiment.ticker in result:
            result[sentiment.ticker] = {'sum': sentiment.sentiment, 'samples': 1}
        else:
            result[sentiment.ticker]['sum'] += sentiment.sentiment
            result[sentiment.ticker]['samples'] += 1

    for ticker in result:
        result[ticker] = result[ticker]['sum'] / result[ticker]['samples']

    return result


class Sentimenter:
    def __init__(self, tickers: set[str], max_threads: int = 10):
        self.client = language_v1.LanguageServiceClient()
        self.threadpool = ThreadPoolExecutor(max_threads)
        self.tickers = tickers

    def analyze(self, inputs: list[str]) -> list:
        futures = []
        for input in inputs:
            futures.append(self.threadpool.submit(self._analyze, input))

        ticker_sentiments = []
        for future in futures:
            ticker_sentiments.extend(future.result())

        return ticker_sentiments

    @sleep_and_retry
    @limits(calls=450, period=60)  # 450 requests per minute
    def _analyze(self, input: str) -> list:
        """Run a sentiment analysis request on text within a passed filename."""
        document = language_v1.Document(content=input, type_=language_v1.Document.Type.PLAIN_TEXT)
        try:
            response = self.client.analyze_entity_sentiment(request={'document': document})
        except:  # some shitty exception like this dude that posted in german and not english
            return []

        results = []
        for entity in response.entities:
            if entity.sentiment.score != 0:
                ticker = entity.name if entity.name in self.tickers else None
                if ticker:
                    ticker_sentiment = TickerSentiment(ticker, entity.sentiment.score)
                    results.append(ticker_sentiment)

        return results
