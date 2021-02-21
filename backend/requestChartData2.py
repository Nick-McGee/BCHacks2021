from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.fundamentaldata import FundamentalData

import requests
import time
import json

open = "1. open"
high = "2. high"
low = "3. low"
close = "4. close"
volume = "5. volume"
base = 'https://www.alphavantage.co/query?'
lastUpdate = {}


# 'TIME_SERIES_INTRADAY_EXTENDED', do not use, up to 2gb
functions = ['TIME_SERIES_INTRADAY', 
			'TIME_SERIES_DAILY',
			'TIME_SERIES_WEEKLY',
			'TIME_SERIES_MONTHLY',
			]
			
interval = ['1min', '5min', '15min', '30min', '60min']
outputsize = ['compact', 'full']
API_KEY = "243A8PGA8D6OHJQG"

#this is only for solo testing to shorthand 
symbol = [
        'AAPL', 'MMM', 'BA', 'AXP', 'CAT',
        'CVX', 'CSCO', 'KO', 'DD', 'XOM',
        'GS', 'HD', 'IBM', 'INTC', 'JNJ',
        'JPM', 'MCD', 'MRK', 'MSFT', 'NKE', 
        'PFE', 'PG', 'UNH', 'UTX', 'TRV',
        'VZ', 'V', 'WMT', 'WBA', 'DIS'
]

#candleStick = []

#company = symbol[3]

#this function returns all new updates to a given stock, most recent to least recent, this function is spam proof. loop over on back end
def getData(company, function, interval):

	
	url = base + 'function=' + function + '&interval=' + interval + '&symbol=' + company + "&outputsize=" + outputsize[1] + "&apikey=" + API_KEY
	print(url)

	response = requests.get(url)
	response.raise_for_status()
	jsonResponse = response.json()
	
	header = ""
	
	if function == functions[0]:
		if interval == "1min":
			header = "Time Series (1min)"
		elif interval == "5min":
			header = "Time Series (5min)"
		elif interval == "15min":
			header = "Time Series (15min)"
		elif interval == "30min":
			header = "Time Series (30min)"
		elif interval == "60min":
			header = "Time Series (60min)"
	elif function == functions[1]:	
		header = "Time Series (Daily)"
	elif function == functions[2]:
		header = "Weekly Time Series"
	elif function == functions[2]:
		header = "Monthly Time Series"
	
	openSet = []
	highSet = []
	lowSet = []
	closeSet = []
	timeSet = []
	candleStick = []

	
	try:
		lastUpdate[company]
	except:
		lastUpdate[company] = ""
	
	for key in jsonResponse[header]:
		if key != lastUpdate[company]:
			#print(key, ":", jsonResponse['Time Series (1min)'][key])
			openVal = jsonResponse[header][key][open]
			openSet.append(openVal)
			
			highVal = jsonResponse[header][key][high]
			highSet.append(highVal)
			
			lowVal = jsonResponse[header][key][low]
			lowSet.append(lowVal)
			
			closeVal = jsonResponse[header][key][close]
			closeSet.append(closeVal)
			
			timeSet.append(convertTime(key))
			arr = [convertTime(key), openVal, highVal, lowVal, closeVal]
			#print(arr)
			candleStick.append(arr)
			#makeGrapgh(candleStick)
			
			#print(jsonResponse['Time Series (1min)'])
			
			
		else: 
			print('No updates/old end reached')
			#lastUpdate[company] = key
	lastUpdate[company] = key
	
	return candleStick


def convertTime(string):
	#graph syntax #['11/15/2014', 93.87, 94.91, 93.7, 93.76], #month day year
	#alpha vantage #year month day #2021-02-19
	year = string[0:4]
	month = string[5:7]
	day = string[8:10]
	time = string[10:]
	
	#return month + "/" + day + "/" + year
	return month + "/" + day + "/" + year + " " + time


	