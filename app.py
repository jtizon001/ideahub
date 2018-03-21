import flask
from flask import Flask, request, url_for, jsonify, json, make_response,current_app
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS, cross_origin
from datetime import timedelta
from functools import update_wrapper
from bottle import route, app

import Exporter
#
# def after_request(response):
#     response.headers['Access-Control-Allow-Origin'] = '*'
#     response.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
#     response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
#     return response

app=Flask(__name__)
# app.after_request(after_request)
#CORS(app)
# app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
# app.config['CORS_HEADERS'] = 'Content-Type'
#
CORS(app, resources={r"/foo": {"origins": "http://localhost:3000"}})


@app.route('/',methods=['GET','POST'])
def index():
	return flask.send_from_directory('static', 'index.html')

@app.route('/api/test', methods=['GET'])
# @cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
# @cross_origin(origin='localhost')
def template():
	# usernameArg=request.get_json()
	# user=usernameArg['user']
	# print(username)
	# # # response=jsnofy(user="joe")
	# # bottle.response.set_header("Access-Control-Allow-Origin", "*")
    # # bottle.response.set_header("Allow-Methods", "GET, POST, OPTIONS")
    # # bottle.response.set_header("Access-Control-Allow-Headers", "Origin, Content-Type")
    # 	return jsonify(user="joe")
	if request.method == 'OPTIONS':
	    res = flask.make_response()
	if request.method == 'POST':
	    data = request.data
	    data = json.loads(data)
	    res = flask.make_response(data)
	# res.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
	res.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS'
	res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
	return res

@app.route('/api/byUserName',methods=['GET'])
# @cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def scrapeByUser():
	if request.headers['Content-Type']=='application/json':
		usernameArg=request.get_json()
		username=usernameArg['username']
		print(username)
		Exporter.main(['--username', username, '--maxtweets', '1'])
		return 'hello'

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
