import flask
from flask import Flask, request, url_for, jsonify, json, make_response,current_app
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS, cross_origin
import Exporter

app=Flask(__name__)
CORS(app)


@app.route('/',methods=['GET','POST'])
def index():
	return flask.send_from_directory('static', 'index.html')

@app.route('/api/form',methods=['GET','POST','OPTIONS'])
def scrapeForm():
	user=''
	tweet_amount=''
	checked='false'
	filename=''
	keyword=''
	start_date=''
	end_date=''
	near=''
	within=''
	commandList=[]
	if request.method == 'OPTIONS':
	    res = flask.make_response()
	if request.method == 'POST':
		formArg=request.get_json()
		checked=formArg.get('checked')
		if checked==True:
			commandList.extend(['--toptweets'])
		user=formArg.get('user')
		if user:
			commandList.extend(['--username',str(user)])
		tweet_amount=formArg.get('tweet_amount')
		if tweet_amount:
			commandList.extend(['--maxtweets',str(tweet_amount)])
		filename=formArg.get('filename')
		if filename:
			commandList.extend(['--output',str(filename)])
		keyword=formArg.get('keyword')
		if keyword:
			commandList.extend(['--querysearch',str(keyword)])
		near=formArg.get('near')
		if near:
			commandList.extend(['--near',str(near)])
		within=formArg.get('within')
		if within:
			commandList.extend(['--within',str(within)])
		start_date=formArg.get('start_date')
		if start_date:
			commandList.extend(['--since',str(start_date)])
		end_dare=formArg.get('end_date')
		if end_date:
			commandList.extend(['--until',str(end_date)])
		res = flask.make_response(jsonify(res='hello'))
		Exporter.main(commandList)
	res.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
	res.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
	res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
	return res

@app.route('/api/sentiment', methods=['GET', 'POST'])
def getSentiment():
	credentials = {"url": "https://gateway.watsonplatform.net/natural-language-understanding/api","username": "cacede17-f1de-4533-bde9-7f3554bf7030","password": "frAC0V0rUWTD"}

	if request.headers['Content-Type']=='application/json':
		#do stuff
		print (json_res)
	return 'blah'

@app.route('/getCSV', methods=['POST'])
def getCSV():

	# request.data = file_name="file"

	if (request.headers['Content-Type']=='application/json'):

		# fileName = "file".csv
		fileName = request.data.split('=')[1] + ".csv"
		response = json.dumps(fileName)
		return response


if __name__=='__main__':
	app.run(debug=True)
