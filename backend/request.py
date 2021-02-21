from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.fundamentaldata import FundamentalData

import requests
import os.path
from bs4 import BeautifulSoup
import csv
import time
import random
import json
import threading

lastTime = ""
open = "1. open"
high = "2. high"
low = "3. low"
close = "4. close"
volume = "5. volume"
base = 'https://www.alphavantage.co/query?'
lastUpdate = {}


# 'TIME_SERIES_INTRADAY_EXTENDED', do not use, up to 2gb
function = ['TIME_SERIES_INTRADAY', 
			'TIME_SERIES_DAILY', 'TIME_SERIES_DAILY_ADJUSTED', 
			'TIME_SERIES_WEEKLY', 'TIME_SERIES_WEEKLY_ADJUSTED', 
			'TIME_SERIES_MONTHLY', 'TIME_SERIES_MONTHLY_ADJUSTED',
			]
			
interval = ['1min', '5min', '15min', '30min', '60min']
outputsize = ['compact', 'full']
API_KEY = "243A8PGA8D6OHJQG"
symbol = [
        'AAPL', 'MMM', 'BA', 'AXP', 'CAT',
        'CVX', 'CSCO', 'KO', 'DD', 'XOM',
        'GS', 'HD', 'IBM', 'INTC', 'JNJ',
        'JPM', 'MCD', 'MRK', 'MSFT', 'NKE', 
        'PFE', 'PG', 'UNH', 'UTX', 'TRV',
        'VZ', 'V', 'WMT', 'WBA', 'DIS'
]

company = symbol[3]

def getData(url, company):
	response = requests.get(url)
	response.raise_for_status()
	jsonResponse = response.json()
	
	openSet = []
	highSet = []
	lowSet = []
	closeSet = []
	#timeSet = []
	
	
	try:
		lastUpdate[company]
	except:
		lastUpdate[company] = ""
	
	for key in jsonResponse['Time Series (1min)']:
		if key != lastUpdate[company]:
			#print(key, ":", jsonResponse['Time Series (1min)'][key])
			openSet.append(jsonResponse['Time Series (1min)'][key][open])
			highSet.append(jsonResponse['Time Series (1min)'][key][high])
			lowSet.append(jsonResponse['Time Series (1min)'][key][low])
			closeSet.append(jsonResponse['Time Series (1min)'][key][close])
			#timeSet.append(key)
		else: 
			print('No updates/old end reached')
			#lastUpdate[company] = key
	lastUpdate[company] = key


## testing
url = base + 'function=' + function[0] + '&interval=' + interval[0] + '&symbol=' + symbol[0] + "&outputsize=" + outputsize[1] + "&apikey=" + API_KEY
getData(url, company)
x = input()
url = base + 'function=' + function[0] + '&interval=' + interval[0] + '&symbol=' + symbol[0] + "&outputsize=" + outputsize[1] + "&apikey=" + API_KEY
getData(url, company)
company = symbol[4]
x = input()
url = base + 'function=' + function[0] + '&interval=' + interval[0] + '&symbol=' + symbol[0] + "&outputsize=" + outputsize[1] + "&apikey=" + API_KEY
getData(url, company)
x = input()
url = base + 'function=' + function[0] + '&interval=' + interval[0] + '&symbol=' + symbol[0] + "&outputsize=" + outputsize[1] + "&apikey=" + API_KEY
getData(url, company)
#testing

print(lastUpdate)

	