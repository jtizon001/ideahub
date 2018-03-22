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

@app.route('/api/byUserName',methods=['GET','POST','OPTIONS'])
def scrapeByUser():
	user=''
	if request.method == 'OPTIONS':
	    res = flask.make_response()
	if request.method == 'POST':
		usernameArg=request.get_json()
		user=usernameArg.get('user')
		print(user)
		res = flask.make_response(jsonify(user='jason'))
	res.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
	res.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
	res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
	Exporter.main(['--username', user, '--maxtweets', '100'])
	return res

@app.route('/api/byKeyword',methods=['GET','POST','OPTIONS'])
def scrapeByKeyword():
	keyword=''
	if request.method == 'OPTIONS':
	    res2 = flask.make_response()
	if request.method == 'POST':
		keyArg=request.get_json()
		keyword=keyArg.get('keyword')
		print(keyword)
		res2 = flask.make_response(jsonify(user='jason'))
	res2.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
	res2.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
	res2.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
	# Exporter.main(['--querysearch', keyword, '--maxtweets', '1'])
	return res2

@app.route('/sentiment', methods=['GET', 'POST'])
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
