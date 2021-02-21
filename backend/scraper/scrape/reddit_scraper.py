import praw
import json
from datetime import datetime
from os import path


def scrape(lastScanned):
    if path.exists('reddit.json'):
        print('path existed')
        with open('reddit.json') as jsonFile:
            data = json.load(jsonFile)
        outputData = []
        for post in data['data']:
            comArr = []
            for comment in post['comments']:
                comArr.append(Comment(comment['body'], comment['created']))
            outputData.append(Post(post['title'], post['text'], comArr, post['created']))

        return outputData, True
    else:
        print('path not existed')
        data = ''
        outputData=[]
        with open('./scrape/redditInfo.json') as jsonFile:
            data = json.load(jsonFile)

        reddit = praw.Reddit(client_id=data['credentials']['client_id'],
                             client_secret=data['credentials']['client_secret'],
                             user_agent=data['credentials']['user_agent'],
                             username=data['credentials']['username'],
                             password=data['credentials']['password'])

        posts = []

        for subreddit in data['subreddits']:
            for submission in reddit.subreddit(subreddit).new(limit=5000):
                comments=[]
                if (not lastScanned or datetime.fromtimestamp(submission.created_utc).timestamp() > lastScanned) and \
                        submission.link_flair_text is not None and submission.selftext != '' and \
                        submission.link_flair_text.lower() != 'comedy':
                    submission.comment_sort='top'
                    comArr=[]
                    for i in range(min(5, len(submission.comments))):
                        comment = submission.comments[i]
                        comArr.append(Comment(comment.body, comment.created_utc))
                        comments.append({"body":comment.body, "created": comment.created_utc})
                    outputData.append(Post(submission.title, submission.selftext, comArr, submission.created_utc))
                    posts.append({"title": submission.title, "text": submission.selftext, "comments": comments, "created": submission.created_utc})

        jsonOut = {"data": posts}

        with open('reddit.json', 'w+') as outfile:
            json.dump(jsonOut, outfile)

        return outputData, False


class Post:
    id = 1
    def __init__(self, title, text, comments, created):
        # assign id for use later
        self.id = Post.id
        Post.id += 1
        self.created = created
        self.title = title
        self.text = text
        self.comments = comments
        self.processed_title = ''
        self.processed_text = ''
        self.processed_comments = []


class Comment:
    def __init__(self, text, time):
        self.text = text
        self.created = time
