from flask import Flask
import json

app = Flask(__name__)

@app.route('/top5')
def top_5_stox():
    return json.dumps([
        {'GME': {'sentiment': 0.67, 'frequency': 1242}},
        {'AMC': {'sentiment': 0.75, 'frequency': 756}},
        {'EXPR': {'sentiment': 0.89, 'frequency': 647}},
        {'NOK': {'sentiment': 0.72, 'frequency': 423}},
        {'KOSS': {'sentiment': 0.82, 'frequency': 211}}
    ])

if __name__ == "__main__":
    app.run()